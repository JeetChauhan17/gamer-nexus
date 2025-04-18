from flask import Blueprint, request, jsonify
from models.game import Game
from models.rating import Rating
from database import db
from auth_middleware import token_required, admin_required

games_bp = Blueprint('games', __name__)

@games_bp.route('/api/games', methods=['GET'])
def get_games():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    genre = request.args.get('genre')
    platform = request.args.get('platform')
    sort_by = request.args.get('sort_by', 'release_date')
    sort_order = request.args.get('sort_order', 'desc')
    
    # Build query
    query = Game.query
    
    # Apply filters
    if genre:
        query = query.filter(Game.genre == genre)
    if platform:
        query = query.filter(Game.platforms.contains(platform))
    
    # Apply sorting
    if sort_by == 'title':
        query = query.order_by(Game.title.asc() if sort_order == 'asc' else Game.title.desc())
    elif sort_by == 'release_date':
        query = query.order_by(Game.release_date.asc() if sort_order == 'asc' else Game.release_date.desc())
    elif sort_by == 'rating':
        query = query.order_by(Game.avg_rating.asc() if sort_order == 'asc' else Game.avg_rating.desc())
    
    # Paginate results
    paginated_games = query.paginate(page=page, per_page=per_page)
    
    # Format response
    games = []
    for game in paginated_games.items:
        games.append({
            'id': game.id,
            'title': game.title,
            'slug': game.slug,
            'description': game.description,
            'genre': game.genre,
            'platforms': game.platforms,
            'developer': game.developer,
            'publisher': game.publisher,
            'release_date': game.release_date.strftime('%Y-%m-%d'),
            'avg_rating': game.avg_rating,
            'total_ratings': game.total_ratings,
            'cover_image': game.cover_image
        })
    
    return jsonify({
        'games': games,
        'total': paginated_games.total,
        'pages': paginated_games.pages,
        'current_page': page
    }), 200

@games_bp.route('/api/games/<slug>', methods=['GET'])
def get_game(slug):
    game = Game.query.filter_by(slug=slug).first()
    
    if not game:
        return jsonify({'message': 'Game not found'}), 404
    
    return jsonify({
        'id': game.id,
        'title': game.title,
        'slug': game.slug,
        'description': game.description,
        'genre': game.genre,
        'platforms': game.platforms,
        'developer': game.developer,
        'publisher': game.publisher,
        'release_date': game.release_date.strftime('%Y-%m-%d'),
        'avg_rating': game.avg_rating,
        'total_ratings': game.total_ratings,
        'cover_image': game.cover_image,
        'screenshots': game.screenshots
    }), 200

@games_bp.route('/api/games', methods=['POST'])
@admin_required
def create_game():
    data = request.get_json()
    
    new_game = Game(
        title=data['title'],
        slug=data['slug'],
        description=data['description'],
        genre=data['genre'],
        platforms=data['platforms'],
        developer=data['developer'],
        publisher=data['publisher'],
        release_date=data['release_date'],
        cover_image=data.get('cover_image', ''),
        screenshots=data.get('screenshots', [])
    )
    
    db.session.add(new_game)
    db.session.commit()
    
    return jsonify({
        'message': 'Game created successfully',
        'game': {
            'id': new_game.id,
            'title': new_game.title,
            'slug': new_game.slug
        }
    }), 201

@games_bp.route('/api/games/<int:game_id>', methods=['PUT'])
@admin_required
def update_game(game_id):
    game = Game.query.get(game_id)
    
    if not game:
        return jsonify({'message': 'Game not found'}), 404
    
    data = request.get_json()
    
    game.title = data.get('title', game.title)
    game.slug = data.get('slug', game.slug)
    game.description = data.get('description', game.description)
    game.genre = data.get('genre', game.genre)
    game.platforms = data.get('platforms', game.platforms)
    game.developer = data.get('developer', game.developer)
    game.publisher = data.get('publisher', game.publisher)
    game.release_date = data.get('release_date', game.release_date)
    game.cover_image = data.get('cover_image', game.cover_image)
    game.screenshots = data.get('screenshots', game.screenshots)
    
    db.session.commit()
    
    return jsonify({'message': 'Game updated successfully'}), 200

@games_bp.route('/api/games/<int:game_id>', methods=['DELETE'])
@admin_required
def delete_game(game_id):
    game = Game.query.get(game_id)
    
    if not game:
        return jsonify({'message': 'Game not found'}), 404
    
    db.session.delete(game)
    db.session.commit()
    
    return jsonify({'message': 'Game deleted successfully'}), 200

@games_bp.route('/api/games/<int:game_id>/rate', methods=['POST'])
@token_required
def rate_game(current_user, game_id):
    game = Game.query.get(game_id)
    
    if not game:
        return jsonify({'message': 'Game not found'}), 404
    
    data = request.get_json()
    rating_value = data.get('rating')
    
    if not rating_value or not (1 <= rating_value <= 5):
        return jsonify({'message': 'Invalid rating value'}), 400
    
    # Check if user has already rated this game
    existing_rating = Rating.query.filter_by(
        user_id=current_user.id,
        game_id=game_id
    ).first()
    
    if existing_rating:
        # Update existing rating
        existing_rating.rating = rating_value
        existing_rating.updated_at = datetime.datetime.utcnow()
    else:
        # Create new rating
        new_rating = Rating(
            user_id=current_user.id,
            game_id=game_id,
            rating=rating_value
        )
        db.session.add(new_rating)
    
    db.session.commit()
    
    # Update game's average rating
    ratings = Rating.query.filter_by(game_id=game_id).all()
    total = sum(r.rating for r in ratings)
    count = len(ratings)
    
    game.avg_rating = total / count if count > 0 else 0
    game.total_ratings = count
    db.session.commit()
    
    return jsonify({
        'message': 'Rating submitted successfully',
        'new_avg_rating': game.avg_rating,
        'total_ratings': game.total_ratings
    }), 200
