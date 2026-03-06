# Tour of Agents - Build Tasks

## Phase 1: Project Scaffold [DONE]
- [x] Next.js + Tailwind + shadcn/ui + all deps
- [x] next.config.ts with output: 'export'
- [x] Vitest + React Testing Library
- [x] Storybook 10

## Phase 2: Core Library Files [DONE]
- [x] Trace types, parser, mermaid converter
- [x] Lesson types + registry
- [x] API key settings
- [x] All 8 Python runtime modules (.py.ts)
- [x] Pyodide provider + runtime loader

## Phase 3: Hooks [DONE]
- [x] use-code-runner, use-local-storage

## Phase 4: Components [DONE - need tests + stories]
- [x] Layout: site-header, sidebar-nav, providers
- [x] Lesson: code-editor, run-button, output-panel, trace-viewer,
      mermaid-diagram, lesson-prose, solution-reveal, lesson-page
- [x] Settings: api-key-dialog

## Phase 5: Lesson Content [DONE - 8 files over 200 lines]
- [x] All 10 lessons + registry

## Phase 6: App Pages [DONE]
- [x] layout.tsx (server component + Providers wrapper)
- [x] page.tsx (landing page)
- [x] lesson/[slug]/page.tsx (lesson route, SSG)

## Phase 7: Dev Harness [DONE]
- [x] Pre-commit hook: line count + tsc + lint-staged
- [x] lint-staged: ESLint + vitest related on staged files
- [x] CLAUDE.md with TDD loop
- [x] Vitest config: unit + storybook projects
- [x] MSW setup: handlers, server, auto-start in test setup
- [x] Test fixtures: trace-events, pyodide-outputs, llm-responses
- [x] Coverage config: v8 provider, 80% threshold on src/lib
- [x] `npm test` / `npm run test:coverage` / `npm run test:all`

## Phase 8: Tests [IN PROGRESS]
- [x] src/lib/trace/parse-trace.test.ts (3 tests)
- [x] src/lib/trace/trace-to-mermaid.test.ts (10 tests, 2 snapshots)
- [x] src/lib/trace/integration.test.ts (5 tests, full pipeline)
- [x] src/lib/lessons/registry.test.ts (10 tests)
- [x] src/lib/settings/api-keys.test.ts (7 tests)
- [ ] src/hooks/use-code-runner.test.ts (stub Pyodide)
- [ ] Component render tests (trace-viewer, output-panel, etc.)

## Phase 9: Storybook Stories
- [ ] run-button.stories.tsx
- [ ] output-panel.stories.tsx
- [ ] trace-viewer.stories.tsx
- [ ] mermaid-diagram.stories.tsx
- [ ] lesson-prose.stories.tsx
- [ ] solution-reveal.stories.tsx
- [ ] api-key-dialog.stories.tsx
- [ ] sidebar-nav.stories.tsx
- [ ] site-header.stories.tsx

## Phase 10: Split Oversized Files
- [ ] 03-adding-tools.ts (223 lines)
- [ ] 04-tool-protocol.ts (216 lines)
- [ ] 05-state.ts (223 lines)
- [ ] 06-event-inbox.ts (212 lines)
- [ ] 07-heartbeat-loop.ts (239 lines)
- [ ] 08-memory.ts (268 lines)
- [ ] 09-policy.ts (274 lines)
- [ ] 10-trace-replay.ts (340 lines)

## Phase 11: Polish
- [ ] Mobile responsive (Sheet sidebar)
- [ ] Dark/light theme persistence
- [ ] Trace step-through animation
- [ ] Error boundaries
