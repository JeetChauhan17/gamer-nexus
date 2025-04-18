# 🎮 Gamer Nexus - A Python Game Wiki & Community Hub

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-Web_Framework-lightgrey?logo=flask" alt="Flask" />
  <img src="https://img.shields.io/badge/Next.js-13+-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-4.0+-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0+-cyan?logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  <img src="https://img.shields.io/badge/Build-passing-brightgreen" alt="Build Status" />
</p>

Gamer Nexus is a **modern, community-driven platform** for gamers and indie developers. Discover and discuss games, contribute to wikis, rate titles, and stay updated with the latest gaming news—all in one place.

---

## 🌐 Live Demo

🔗 [https://gamer-nexus-m.vercel.app](https://gamer-nexus-m.vercel.app)

---

## ✨ Key Features

### 👾 For Gamers

- 🔥 Browse and search for the **latest and trending games**
- 📖 Access detailed **game wikis** with descriptions, media, and ratings
- 💬 Engage in **forums** to discuss games and share experiences
- ⭐ **Rate** and ❤️ **like** your favorite games
- 📰 Stay updated with curated **gaming news**

### 🛠️ For Game Developers

- 📤 **Upload your games** and showcase them to a global audience
- 🧩 Get discovered by players worldwide
- 📈 Receive feedback through ratings, likes, and forum discussions

### 📚 Resources for Aspiring Developers

- 🧠 Access **GameDev resources** including tools, tutorials, engines, and assets
- 🚀 Follow step-by-step guides to start building your own games

---

## 🛠️ Tech Stack

| Layer      | Tools Used                        |
|------------|-----------------------------------|
| Frontend   | Next.js, TypeScript, Tailwind CSS |
| Backend    | API Routes in Python & Next.js    |
| Database   | MongoDB                           |
| Hosting    | Vercel                            |

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/JeetChauhan17/gamer-nexus.git
cd gamer-nexus
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file with the following:

```env
MONGO_URI=your_mongo_uri
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
```

> Ensure you have the necessary API keys from [RAWG](https://rawg.io/apidocs) and your news provider.

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```
gamer-nexus/
├── api/                 # API routes
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 
├── public/              # Static assets
├── styles/              # Global styles and Tailwind configurations
├── .env.local           # Environment variables
├── next.config.mjs      
├── package.json         
└── tsconfig.json        # TypeScript configuration
```

---
## Note : 
- Games and game data are dynamically fetched fron a Game API. So no content is hardcoded.
- News data, wiki data, reddit communities and discussions are fetched from APIs. There is no hardcoded data.
- Auth support is currently down due to MongoDB's cloud cluster issues. Will be back up soon
- This MongoDB's cluster downtime might cause some functionalities like (forums, wikis, review) to malfunction or not work. I am working on getting it back up ASAP. 
---

## ✅ To-Do

- [ ] Fix MongoDB's Cluster issue or setup new cluster.
- [x] get  wikis back up.
- [ ] get working forums (fix auth by fixing mongo)
- [ ] Implement dynamic fetching of YouTube creators
- [x] Redesign and render the GameDev resource page as a static page
- [ ] Enhance search functionality with history support

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss what you'd like to change or improve.

---

## 📄 License

MIT License © 2025 Jeet Chauhan  
[JeetChauhan17 on GitHub](https://github.com/JeetChauhan17)
