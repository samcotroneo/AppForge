# Claude guidance for AppForge

## Mission
Use this repository as an app-builder template for production-minded Capacitor PWAs built with SolidJS, Tailwind, and DaisyUI.

## Architectural rules
- Preserve the feature-first structure under `src/features`.
- Keep TSX files focused on composition and rendering.
- Prefer pure helpers and typed data models next to each feature instead of embedding business logic directly in large view files.
- Keep Capacitor-specific code behind `src/lib` adapters so browser and native behavior stay easy to reason about.
- Favor DaisyUI semantic components first, then Tailwind utilities for layout polish.

## Implementation workflow
1. Read `README.md` and `docs/agent-workflows.md` before making structural changes.
2. Add new user-facing capabilities inside a dedicated feature folder.
3. Reuse shared shell and section components before introducing new layout primitives.
4. Validate with `npm run lint`, `npm run test:unit`, and `npm run build` before finalizing.

## Sub-agent delegation
- Use research/explore agents for plugin selection, native integration trade-offs, and multi-file discovery.
- Use task agents for lint/build/test execution.
- Keep final architecture decisions, cross-feature integration, and documentation updates in the main agent.
