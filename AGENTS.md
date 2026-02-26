# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript + Vite portfolio website with Three.js 3D graphics and an interactive chess game.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite dev server | `npm run dev` | 5173 | Main (and only) service needed for development |

### Key commands

See `package.json` scripts. Summary:

- **Dev server:** `npm run dev` (Vite on port 5173)
- **Lint:** `npm run lint` (ESLint, flat config in `eslint.config.js`)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Preview prod build:** `npm run preview`

### Non-obvious notes

- The initial page load includes a loading screen (progress bar 0-100%) that takes ~30-60 seconds in headless/cloud environments as it loads 3D character assets. Wait for it to complete before interacting.
- The `/play` route has a chess game (using WASM-based engine at `public/redoxchess.wasm`) that works fully offline. The AI chatbot sidebar on that page requires a Vercel serverless function (`api/chat.js`) + `GROQ_API_KEY` env var and does not work with `npm run dev` alone — this is expected and non-blocking.
- ESLint reports ~36 pre-existing errors (mostly `prefer-const`, `no-explicit-any`). These are in the existing codebase and do not block development.
- No automated test framework is configured (no Jest, Vitest, etc.). Testing is manual only.
