# 📈 StockSense — Complete Stock Market Education App

Learn it → Practice it → Invest it.

## Tech Stack
- **Frontend:** React + Vite (plain JSX, no CSS framework)
- **AI:** Groq API (llama-3.3-70b-versatile) via Vercel serverless function
- **Deployment:** Vercel

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Get your Groq API key
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up free
3. Go to **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial StockSense deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stocksense.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Environment Variables** and add:
   ```
   GROQ_API_KEY = gsk_your_key_here
   ```
7. Click **Deploy** ✅

Done! Your app is live.

---

## 💻 Run Locally

### Prerequisites
- Node.js 18+
- Vercel CLI: `npm i -g vercel`

### Setup
```bash
npm install
```

Create a `.env.local` file in the root:
```
GROQ_API_KEY=gsk_your_key_here
```

### Run with Vercel Dev (recommended — handles API routes)
```bash
vercel dev
```
Open [http://localhost:3000](http://localhost:3000)

### Run with Vite only (no AI features)
```bash
npm run dev
```

---

## 📁 Project Structure

```
stocksense/
├── api/
│   └── chat.js          ← Vercel serverless function (Groq API proxy)
├── src/
│   ├── main.jsx         ← React entry point
│   └── App.jsx          ← Complete app (splash, onboard, academy, trading)
├── index.html           ← HTML entry point
├── package.json
├── vite.config.js
├── vercel.json          ← Vercel routing config
└── .env.local           ← Your API key (never commit this!)
```

---

## 🔧 How It Works

```
User types question in app
        ↓
Frontend calls POST /api/chat
        ↓
Vercel serverless function (api/chat.js)
        ↓
Groq API (llama-3.3-70b-versatile)
        ↓
Response returned to frontend
        ↓
Displayed in chat / AI analysis
```

The Groq API key **never touches the browser** — it stays on the server.

---

## 🔐 Security Notes

- Never commit `.env.local` to Git (it's in .gitignore)
- The `GROQ_API_KEY` is only available server-side in `api/chat.js`
- All AI calls are proxied through Vercel — safe for production

---

## 📱 Features

- **Splash screen** — Animated logo reveal
- **3-slide onboarding** — Shows app value before signup
- **Profile setup** — Personalized experience with your name
- **Academy** — 30 deep lessons across 5 chapters with quizzes + XP
- **Markets** — 10 stocks with live simulated prices (3s updates)
- **Practice** — Paper trading with $10,000 fake money
- **Invest** — Real broker recommendations with direct links
- **Advisor** — AI chat powered by Groq (llama-3.3-70b)

---

## 📄 License

Educational purposes only. Not financial advice.
