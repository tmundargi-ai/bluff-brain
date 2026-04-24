# Bluff Brain ~ Wrong Answers Only

The comedy trivia game where being right is losing.

Bluff Brain flips trivia on its head. You're given real questions with real answers; but your job is to come up with the funniest, most creative wrong answer you can think of. An AI judge named Captain Confidently Incorrect scores your responses on humor, creativity, and sheer audacity.

> "What is the capital of France?" → "A baguette factory that gained sentience in 1743, obviously."

And the AI gives dramatic responses if you are not actually being funny. 

🎮 Play it, Win it

----------------------------------------------------------------------------------------------------------------------------------------

# Features

# 🎯 Three Game Modes
- Classic Mode — Relaxed rounds, no timer, maximum creativity. Perfect for crafting the ultimate wrong answer.
- Blitz Mode — 20 seconds per question. Think fast, be funny, don't overthink it.
- Daily Challenge — Same 5 questions for everyone, every day. Compete globally on the leaderboard.

# 🤖 AI Judge: Captain Confidently Incorrect
Every answer gets a personalized verdict from the Captain — ranging from *"I've seen more creative answers on a tax return"* to *"I am DECEASED. This is the wrongest thing I've ever read."*

Five scoring tiers: Legendary → High → Medium → Low → Correct (zero points!)

# 💯 Scoring System
Your score is based on:
- Creativity — Absurd, unexpected answers score higher
- Commitment — Starting with "Obviously..." or "Well actually..." earns bonus points
- Confidence Checkbox — Check "I said this with total confidence" for +15 bonus points
- Length & Effort — One-word answers score low. Elaborate nonsense scores high.
- Correct Answer Rejection — If you accidentally give the right answer, the screen shakes and rejects it. This is a wrong answers game.

# 🔥 Streak System
Land multiple high-scoring answers in a row to build a streak multiplier. Your best streak is tracked and displayed.

# Confetti Explosions
Score 80+ (Legendary tier) and get a confetti shower. Because you earned it.

# 🏆 Global Leaderboard
Persistent leaderboard that tracks top scores across all players. Save your name after each game and see how you rank against the world's best bluffers.

# Mobile-First Design
Single-column responsive layout that works perfectly on phones, tablets, and desktops. No broken layouts, no horizontal scrolling.

------------------------------------------------------------------------------------------------------------------------------------

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework with hooks for state management |
| JavaScript | Game logic, scoring algorithm, timer system |
| CSS-in-JS | Inline styles with animations (gradient title, confetti, shake effects) |
| Persistent Storage API | Global leaderboard that persists across sessions |
| Google Fonts | Outfit (display) + Space Mono (monospace accents) |

# Built With
- OpenAI Codex — Used for initial scaffolding, iteration, and rapid prototyping
- Claude AI — Used for UX design, scoring algorithm, and game polish

---

# 🚀 Getting Started

# Option 1: Run locally with React
```bash
# Clone the repository
git clone https://github.com/tmundargi-ai/bluff-brain.git
cd bluff-brain

# Install dependencies
npm install

# Start the development server
npm start
```

# Option 2: Deploy as a static site
The game is a single React component (`bluff-brain.jsx`) with no external dependencies beyond React itself. You can deploy it to:
- Vercel — `npx vercel`
- Netlify — Drag and drop the build folder
- GitHub Pages — Push to `gh-pages` branch

---

# Project Structure

```
bluff-brain/
├── README.md
├── bluff-brain.jsx      # Main game component (single file)
├── package.json
└── public/
    └── index.html
```

The entire game lives in a single React component file for simplicity and portability.

# 🎮 How to Play

1. Pick a mode — Classic, Blitz, or Daily Challenge
2. Read the question — A real trivia question with the correct answer shown
3. Type a wrong answer — The funnier and more creative, the better
4. Check the confidence box (optional) — For +15 bonus points if you're feeling bold
5. Get judged — Captain Confidently Incorrect scores your answer and delivers a verdict
6. Beat your high score — Save to the leaderboard and compete globally

# Scoring Guide
| Score | Tier | What it means |
|---|---|---|
| 80-100 | 🟣 Legendary | Peak comedy. Confetti earned. |
| 55-79 | 🟢 High | Genuinely funny. Captain approves. |
| 30-54 | 🟡 Medium | Decent wrongness. Room to grow. |
| 1-29 | 🔴 Low | Barely trying. Captain is disappointed. |
| 0 | ⚫ Correct | You answered correctly. In a wrong answers game. |

---

# 🗺️ Roadmap

- [ ] AI-powered scoring — Replace local scoring with real API calls for genuine humor evaluation
- [ ] Multiplayer mode — Real-time head-to-head wrong answer battles
- [ ] Custom question packs — Let users create and share their own question sets
- [ ] Share cards — Generate shareable score cards for social media
- [ ] Sound effects — Audio feedback for scoring tiers and confetti moments
- [ ] More categories — Pop culture, sports, movies, tech, and more

-----------------------------------------------------------------------------------------------------


Why Bluff Brain?
- Instantly playable — understand it in 3 seconds, start playing in 5
- Infinitely replayable — 40+ questions, 3 modes, randomized order
- Genuinely fun — not a tool disguised as a game
- Demonstrates real AI concepts — natural language analysis, scoring algorithms, adaptive feedback
- Built to be shared — every score is a screenshot moment


# Author

Thejaswini Mundargi
- Handshake: [https://iit.joinhandshake.com/profiles/td8b9a]
- GitHub: [tmundargi-ai]
- Built with Codex + Claude AI

*The comedy game where being right is losing. Be wrong. Be bold. Be a Bluff Brain.*
