# Galatama Fishing Simulator

Fishing competition simulator dibangun dengan React, TypeScript, Vite, and Tailwind CSS.

## Run Project

1. Buka dengan VS Code atau code editor lainnya
2. Buka terminal
3. ketik "npm run dev"
4. klik link "http://localhost:.../

## Desain

Desain saya gunakan sederhana dengan warna hitam biru dan kuning, serta merah dan hijau pada komponen kecil.
Karena terlalu banyak warna akan 

```bash
npm run dev
```

Production build:

```bash
npm run build
```

## Architecture

- `src/hooks/useFishingSession.ts` — session state machine, timer, simulation scheduling, lifecycle cleanup.
- `src/utils/catchSimulator.ts` — pure game logic: random player, fish weight, catch generation, immutable catch application.
- `src/utils/leaderboard.ts` — pure leaderboard sorting.
- `src/utils/formatTime.ts` — `MM:SS` formatting.
- `src/data/players.ts` — initial virtual player data.
- `src/components/` — presentational UI components.

## Session lifecycle

`waiting -> running -> ended`

The catch loop uses recursive `setTimeout` with a randomized 3–6 second delay. A session ID plus `statusRef` prevents stale timeouts from mutating a restarted or ended session.

All interval/timeout handles are cleared on status changes, reset, and component unmount.
