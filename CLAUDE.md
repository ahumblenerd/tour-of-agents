# A Tour of Agents

Interactive browser-based course teaching AI agent systems via Pyodide + Next.js.

## Development Loop (MANDATORY)

Follow this TDD loop for ALL code changes. No exceptions.

### 1. Write Test First
- Create `*.test.ts` or `*.test.tsx` next to the file you're changing
- Test must fail before you write implementation
- Run: `npm test -- --reporter=verbose <path>`
- Use fixtures from `src/test/fixtures/` for sample data -- never inline large test data

### 2. Write Storybook Story
- For every component, create a `*.stories.tsx` next to it
- Stories cover: default state, loading, error, edge cases
- Verify visually: `npm run storybook`

### 3. Write Implementation
- Make the test pass
- Keep files under 200 lines (pre-commit hook enforces this)
- If a file would exceed 200 lines, split it into smaller modules

### 4. Connect & Integrate
- Wire the component into the page/layout
- Run `npm run build` to verify static export works

### 5. Execute & Verify
- `npm test` -- all tests pass
- `npm run build` -- no build errors
- Manual spot check in browser if UI changed

## File Rules

- **Max 200 lines per file** -- enforced by git pre-commit hook
- Lesson content: split markdown into separate `content/` files if needed
- One component per file, one hook per file

## CSS & Styling Rules (MANDATORY)

- **NEVER hardcode hex colors** -- use Tailwind theme tokens: `bg-muted`, `text-foreground`, `border-border`, `text-destructive` etc.
- **NEVER use raw color values** like `text-red-400`, `bg-blue-950` -- use semantic tokens: `text-destructive`, `bg-primary`
- **Use `--header-height` CSS variable** for header offset -- never hardcode `3.5rem` in layout calculations
- **All `<input>` elements must have focus rings** -- use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` or shadcn Input component
- **Light/dark mode must both work** -- test both before shipping. Never use colors that only look correct in one mode
- **Use flex ratios over hardcoded heights** -- `flex-[3]` not `h-[40%]` for responsive splits
- **Mobile: use `scrollbar-none` + `flex-nowrap` + `overflow-x-auto`** for horizontal pill/chip scrolling
- **Touch targets minimum 44x44px** on mobile interactive elements

## Pre-Commit Checks (automatic)

The git pre-commit hook runs three checks in order:
1. **Line count** -- rejects any staged .ts/.tsx file over 200 lines
2. **TypeScript** -- `tsc --noEmit` must pass
3. **lint-staged** -- runs ESLint + related vitest tests on staged files

## Test Strategy

### Unit Tests (vitest + jsdom)
- `src/lib/**/*.test.ts` -- pure logic: trace parsing, mermaid generation, registry
- `src/hooks/*.test.ts` -- hook behavior with mocked deps
- `src/components/**/*.test.tsx` -- component rendering with RTL
- Snapshot tests for deterministic output (mermaid diagrams, trace parsing)

### Integration Tests (stub-based, MSW)
- `src/lib/trace/integration.test.ts` -- full pipeline: raw stdout -> parse -> mermaid
- MSW handlers in `src/test/msw-handlers.ts` stub OpenAI/Anthropic API responses
- MSW server auto-starts in test setup (`src/test/setup.ts`)
- Use fixtures for Pyodide stdout samples, trace events, LLM responses

### Storybook Stories
- `src/components/**/*.stories.tsx` -- every component gets stories
- Cover: default, loading, empty, error, with-data variants
- Storybook vitest addon runs stories as browser tests (`npm run test:all`)

### Coverage
- `npm run test:coverage` -- generates coverage report
- 80% threshold enforced on `src/lib/**` and `src/hooks/**`
- Excluded: lesson content files, Python runtime string modules

### What to Skip
- No tests for actual LLM API calls (requires real keys)
- No E2E browser tests yet
- No tests for shadcn/ui primitives (tested upstream)

## Test Fixtures

All in `src/test/fixtures/`:
- `trace-events.ts` -- sample TraceEvent[] arrays (simple, tool, llm, full, error)
- `pyodide-outputs.ts` -- raw stdout strings as Pyodide would produce
- `llm-responses.ts` -- mock OpenAI/Anthropic API response payloads

## Commands

```
npm test               # Unit tests (vitest + jsdom)
npm run test:watch     # Unit tests in watch mode
npm run test:coverage  # Unit tests with coverage report
npm run test:all       # All tests including storybook browser tests
npm run storybook      # Start storybook dev server
npm run dev            # Start Next.js dev server
npm run build          # Production build (static export)
npm run lint           # ESLint
```

## Architecture

- `src/app/` -- Next.js pages (server components where possible)
- `src/components/` -- React components (client components use "use client")
- `src/lib/` -- Pure logic, no React. Types, parsers, lesson data, Python runtime strings
- `src/hooks/` -- React hooks
- `src/test/` -- Test setup, fixtures, MSW handlers

Key patterns:
- Pyodide loaded once via React context (PyodideProvider)
- Python runtime modules stored as TS string constants, written to Pyodide FS
- All visualization derives from TraceEvent[] pipeline
- MSW stubs LLM APIs at the network level for integration tests
- Mock LLM responses when no API key present (runtime fallback)
