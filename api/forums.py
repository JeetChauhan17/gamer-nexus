from flask import Blueprint, request, jsonify
from models.forum import ForumCategory, ForumPost, ForumComment
from database import db
from auth_middleware import token_required, admin_required
import datetime

forums_bp = Blueprint('forums', __name__)

@forums_bp.route('/api/forums/categories', methods=['GET'])
def get_forum_categories():
   categories = ForumCategory.query.all()
   
   result = []
   for category in categories:
       result.append({
           'id': category.id,
           'name': category.name,
           'slug': category.slug,
           'description': category.description,
           'game_id': category.game_id,
           'post_count': category.post_count
       })
   
   return jsonify({'categories': result}), 200

@forums_bp.route('/api/forums/categories/<int:game_id>', methods=['GET'])
def get_game_forum_categories(game_id):
   categories = ForumCategory.query.filter_by(game_id=game_id).all()
   
   result = []
   for category in categories:
       result.append({
           'id': category.id,
           'name': category.name,
           'slug': category.slug,
           'description': category.description,
           'post_count': category.post_count
       })
   
   return jsonify({'categories': result}), 200

@forums_bp.route('/api/forums/categories', methods=['POST'])
@admin_required
def create_forum_category():
   data = request.get_json()
   
   new_category = ForumCategory(
       name=data['name'],
       slug=data['slug'],
       description=data.get('description', ''),
       game_id=data.get('game_id')
   )
   
   db.session.add(new_category)
   db.session.commit()
   
   return jsonify({
       'message': 'Forum category created successfully',
       'category': {
           'id': new_category.id,
           'name': new_category.name,
           'slug': new_category.slug
       }
   }), 201

@forums_bp.route('/api/forums/posts', methods=['GET'])
def get_forum_posts():
   category_id = request.args.get('category_id', type=int)
   game_id = request.args.get('game_id', type=int)
   page = request.args.get('page', 1, type=int)
   per_page = request.args.get('per_page', 20, type=int)
   
   # Build query
   query = ForumPost.query
   
   # Apply filters
   if category_id:
       query = query.filter_by(category_id=category_id)
   if game_id:
       query = query.join(ForumCategory).filter(ForumCategory.game_id == game_id)
   
   # Order by most recent
   query = query.order_by(ForumPost.created_at.desc())
   
   # Paginate results
   paginated_posts = query.paginate(page=page, per_page=per_page)
   
   # Format response
   posts = []
   for post in paginated_posts.items:
       posts.append({
           'id': post.id,
           'title': post.title,
           'content': post.content,
           'user_id': post.user_id,
           'username': post.user.username,
           'category_id': post.category_id,
           'category_name': post.category.name,
           'created_at': post.created_at.strftime('%Y-%m-%d %H:%M:%S'),
           'updated_at': post.updated_at.strftime('%Y-%m-%d %H:%M:%S') if post.updated_at else None,
           'comment_count': post.comment_count,
           'view_count': post.view_count
       })
   
   return jsonify({
       'posts': posts,
       'total': paginated_posts.total,
       'pages': paginated_posts.pages,
       'current_page': page
   }), 200

@forums_bp.route('/api/forums/posts/<int:post_id>', methods=['GET'])
def get_forum_post(post_id):
   post = ForumPost.query.get(post_id)
   
   if not post:
       return jsonify({'message': 'Post not found'}), 404
   
   # Increment view count
   post.view_count += 1
   db.session.commit()
   
   # Get comments
   comments = []
   for comment in post.comments:
       comments.append({
           'id': comment.id,
           'content': comment.content,
           'user_id': comment.user_id,
           'username': comment.user.username,
           'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
           'updated_at': comment.updated_at.strftime('%Y-%m-%d %H:%M:%S') if comment.updated_at else None
       })
   
   return jsonify({
       'post': {
           'id': post.id,
           'title': post.title,
           'content': post.content,
           'user_id': post.user_id,
           'username': post.user.username,
           'category_id': post.category_id,
           'category_name': post.category.name,
           'created_at': post.created_at.strftime('%Y-%m-%d %H:%M:%S'),
           'updated_at': post.updated_at.strftime('%Y-%m-%d %H:%M:%S') if post.updated_at else None,
           'comment_count': post.comment_count,
           'view_count': post.view_count,
           'comments': comments
       }
   }), 200

@forums_bp.route('/api/forums/posts', methods=['POST'])
@token_required
def create_forum_post(current_user):
   data = request.get_json()
   
   new_post = ForumPost(
       title=data['title'],
       content=data['content'],
       user_id=current_user.id,
       category_id=data['category_id'],
       created_at=datetime.datetime.utcnow(),
       comment_count=0,
       view_count=0
   )
   
   db.session.add(new_post)
   
   # Update category post count
   category = ForumCategory.query.get(data['category_id'])
   if category:
       category.post_count += 1
   
   db.session.commit()
   
   return jsonify({
       'message': 'Forum post created successfully',
       'post': {
           'id': new_post.id,
           'title': new_post.title
       }
   }), 201

@forums_bp.route('/api/forums/posts/<int:post_id>', methods=['PUT'])
@token_required
def update_forum_post(current_user, post_id):
   post = ForumPost.query.get(post_id)
   
   if not post:
       return jsonify({'message': 'Post not found'}), 404
   
   if post.user_id != current_user.id and current_user.role != 'admin':
       return jsonify({'message': 'Unauthorized'}), 403
   
   data = request.get_json()
   
   post.title = data.get('title', post.title)
   post.content = data.get('content', post.content)
   post.updated_at = datetime.datetime.utcnow()
   
   db.session.commit()
   
   return jsonify({'message': 'Forum post updated successfully'}), 200

@forums_bp.route('/api/forums/posts/<int:post_id>', methods=['DELETE'])
@token_required
def delete_forum_post(current_user, post_id):
   post = ForumPost.query.get(post_id)
   
   if not post:
       return jsonify({'message': 'Post not found'}), 404
   
   if post.user_id != current_user.id and current_user.role != 'admin':
       return jsonify({'message': 'Unauthorized'}), 403
   
   # Update category post count
   category = ForumCategory.query.get(post.category_id)
   if category:
       category.post_count -= 1
   
   # Delete associated comments
   ForumComment.query.filter_by(post_id=post_id).delete()
   
   # Delete the post
   db.session.delete(post)
   db.session.commit()
   
   return jsonify({'message': 'Forum post deleted successfully'}), 200

@forums_bp.route('/api/forums/comments', methods=['POST'])
@token_required
def create_forum_comment(current_user):
   data = request.get_json()
   
   new_comment = ForumComment(
       content=data['content'],
       user_id=current_user.id,
       post_id=data['post_id'],
       created_at=datetime.datetime.utcnow()
   )
   
   db.session.add(new_comment)
   
   # Update post comment count
   post = ForumPost.query.get(data['post_id'])
   if post:
       post.comment_count += 1
   
   db.session.commit()
   
   return jsonify({
       'message': 'Comment created successfully',
       'comment': {
           'id': new_comment.id,
           'content': new_comment.content
       }
   }), 201

@forums_bp.route('/api/forums/comments/<int:comment_id>', methods=['PUT'])
@token_required
def update_forum_comment(current_user, comment_id):
   comment = ForumComment.query.get(comment_id)
   
   if not comment:
       return jsonify({'message': 'Comment not found'}), 404
   
   if comment.user_id != current_user.id and current_user.role != 'admin':
       return jsonify({'message': 'Unauthorized'}), 403
   
   data = request.get_json()
   
   comment.content = data.get('content', comment.content)
   comment.updated_at = datetime.datetime.utcnow()
   
   db.session.commit()
   
   return jsonify({'message': 'Comment updated successfully'}), 200

@forums_bp.route('/api/forums/comments/<int:comment_id>', methods=['DELETE'])
@token_required
def delete_forum_comment(current_user, comment_id):
   comment = ForumComment.query.get(comment_id)
   
   if not comment:
       return jsonify({'message': 'Comment not found'}), 404
   
   if comment.user_id != current_user.id and current_user.role != 'admin':
       return jsonify({'message': 'Unauthorized'}), 403
   
   # Update post comment count
   post = ForumPost.query.get(comment.post_id)
   if post:
       post.comment_count -= 1
   
   # Delete the comment
   db.session.delete(comment)
   db.session.commit()
   
   return jsonify({'message': 'Comment deleted successfully'}), 200
