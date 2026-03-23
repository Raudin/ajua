# AJUA

A web-based implementation of **Ajua**, a traditional African strategy board game (in the family of Mancala/Oware), built with **Next.js 15**, **React 19**, and **TypeScript**. Play against a friend on the same device or challenge a minimax AI opponent.

---

## Features

- **Multiplayer** — Two players take turns on the same device, with custom player names.
- **AI Mode** — Play against a computer opponent powered by the **minimax algorithm** with alpha-beta pruning and adaptive search depth.
- **Animated UI** — Smooth page transitions via Framer Motion, a wood-textured game board, and pebble pulse animations.
- **Rules page** — In-app reference for how to play.
- **Responsive navbar** — Fixed floating nav highlighting the active route.

---

## Game Rules

The board has **16 holes** (8 per player) and **2 banks** (one per player). Each hole starts with **3 pebbles**.

1. Players alternate turns picking any hole on **their own side** that is not empty.
2. Pebbles are **sown counterclockwise** one at a time into subsequent holes and into the player's own bank (but never the opponent's bank).
3. If the **last pebble lands in your bank**, you get an **extra turn**.
4. If the **last pebble lands in an opponent's hole** and that hole now holds **exactly 2 or 3 pebbles**, you **capture** all of them into your bank.
5. The game ends when **one player's side is completely empty**. The opposing player collects all remaining pebbles on their side into their bank.
6. The player with the **most pebbles in their bank wins**. Equal counts is a tie.

---

## AI Opponent

The AI uses the **minimax algorithm with alpha-beta pruning**. Search depth adapts to how many pebbles remain on the board:

| Pebbles remaining | Search depth |
| ----------------- | ------------ |
| > 30              | 4            |
| 16 – 30           | 5            |
| ≤ 15              | 6            |

The evaluation function weighs bank score difference, board mobility, and capture opportunities.

---

## Tech Stack

| Layer       | Technology                               |
| ----------- | ---------------------------------------- |
| Framework   | Next.js 15 (App Router)                  |
| UI library  | React 19                                 |
| Language    | TypeScript 5                             |
| Styling     | Tailwind CSS 4                           |
| Animations  | Framer Motion                            |
| Fonts       | Press Start 2P · Orbitron (Google Fonts) |
| Package mgr | pnpm                                     |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with NavBar and page transitions
│   ├── page.tsx            # Home / mode selection screen
│   ├── multiplayer/
│   │   └── page.tsx        # Name entry form + multiplayer game
│   ├── ai/
│   │   └── page.tsx        # Name entry form + AI game
│   └── rules/
│       └── page.tsx        # Game rules reference
├── components/
│   ├── AjuaGame.tsx        # Core game board component (both modes)
│   ├── Hole.tsx            # Individual hole with pebble display
│   ├── Bank.tsx            # Player score bank
│   ├── Pebble.tsx          # Animated pebble visual
│   ├── NavBar.tsx          # Fixed floating navigation bar
│   └── PageTransition.tsx  # Framer Motion route transition wrapper
├── types/
│   └── game.ts             # GameState and GameAction types
└── utils/
    ├── gameReducer.ts      # Pure reducer: sowing, capturing, end-of-game logic
    └── aiPlayer.ts         # Minimax + alpha-beta pruning AI
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
pnpm build
pnpm start
```

---

## Scripts

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Start the development server         |
| `pnpm build` | Create an optimised production build |
| `pnpm start` | Serve the production build           |
| `pnpm lint`  | Run ESLint                           |

---

## License

MIT
