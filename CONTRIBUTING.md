# Contributing to A Tour of Agents

Thanks for your interest in contributing! This project teaches AI agent systems through interactive browser-based lessons.

## Quick Setup

```bash
git clone https://github.com/ahumblenerd/tour-of-agents.git
cd tour-of-agents
npm install
npm run dev
```

Open http://localhost:3000. Python runs in-browser via Pyodide — nothing else to install.

## Development Loop

1. **Write test first** — `npm test -- --reporter=verbose <path>`
2. **Write Storybook story** — `npm run storybook`
3. **Write implementation** — make the test pass
4. **Verify** — `npm test && npm run build`

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm test` | Run unit tests (vitest) |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:coverage` | Tests with coverage |
| `npm run storybook` | Component stories |
| `npm run build` | Production build (static export) |
| `npm run lint` | ESLint |

## Rules

- **Max 200 lines per `.ts`/`.tsx` file** — enforced by pre-commit hook
- One component per file, one hook per file
- No secrets or API keys in code — keys go in `.env.local` (gitignored)
- Pre-commit runs: line count check, `tsc --noEmit`, lint-staged

## Pull Requests

1. Fork and create a feature branch
2. Follow the development loop above
3. All tests must pass (`npm test`)
4. Build must succeed (`npm run build`)
5. Open a PR with a clear description of what and why

## Reporting Issues

Open an issue at https://github.com/ahumblenerd/tour-of-agents/issues with:
- What you expected
- What happened instead
- Browser and OS info (if UI-related)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
