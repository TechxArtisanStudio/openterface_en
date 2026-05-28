# AGENTS.md

## Cursor Cloud specific instructions

This is the Openterface English marketing site — an Astro 6 static site (no backend, no database). Standard commands are in `README.md` and `package.json` scripts.

### Key gotchas

- **Build-time network fetch**: The `predev`/`prebuild` hooks run `scripts/sync-home-videos.mjs` which fetches a CSV from `https://assets.openterface.com/data/youtube.csv`. If the network is unavailable the build will fail. The generated files (`src/data/homeVideos.ts`, `src/data/catalogVideos.ts`) are committed, so you can skip this by running `astro build` directly (bypassing the npm `prebuild` hook) if network is down.
- **Tests require a built preview server**: Tests run against a built static site served via `npm run preview`, NOT the dev server. To run tests: `npm run build && npm run preview -- --port 4321 --host 127.0.0.1 &` then `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4321 CI=true npm test`.
- **Playwright config auto-starts preview**: When `CI` and `PLAYWRIGHT_BASE_URL` are both unset, Playwright config auto-launches `npm run preview -- --port 4321`. Set either env var to manage the server yourself.
- **No linter configured**: There is no ESLint or dedicated lint script. TypeScript checking is done implicitly via the Astro build.

### Services

| Service | Command | Port | Purpose |
|---------|---------|------|---------|
| Astro Dev Server | `npm run dev` | 4321 | Development with HMR |
| Astro Preview Server | `npm run preview -- --port 4321` | 4321 | Serves built `dist/` for testing |

### Running tests

```bash
npm run build
npm run preview -- --port 4321 --host 127.0.0.1 &
npx wait-on http://127.0.0.1:4321 --timeout 60000
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4321 CI=true npm test
```
