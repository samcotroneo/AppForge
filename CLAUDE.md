# Claude guidance for AppForge

## Mission
Use this repository as an app-builder template for production-minded Capacitor PWAs built with Ionic React, Tailwind CSS, and KonstaUI.

## Architectural rules
- Preserve the feature-first structure under `src/features`.
- Keep TSX files focused on composition and rendering.
- Prefer pure helpers and typed data models next to each feature instead of embedding business logic directly in large view files.
- Keep Capacitor-specific code behind `src/lib` adapters so browser and native behavior stay easy to reason about.
- Use KonstaUI components (`konsta/react`) for native-feeling UI, Ionic components (`@ionic/react`) for routing, page structure, and shell, and Tailwind utilities for spacing and layout polish.

## Implementation workflow
1. Read `README.md`, `docs/agent-workflows.md`, and `src/features/bootstrap/starterContract.ts` before making structural changes.
2. Add new user-facing capabilities inside a dedicated feature folder.
3. Wrap each screen in `AppShell` (which renders `IonPage` + `IonHeader` + `IonContent`).
4. Reuse shared shell and section components before introducing new layout primitives.
5. Validate with `npm run lint`, `npm run test:unit`, and `npm run build` before finalizing.
6. When bootstrapping a fresh repo, record the native target choice in `appforge.config.json` and respect the `npx @samcotroneo/appforge init` prompt or `--targets` flag.

## Sub-agent delegation
- Use research/explore agents for plugin selection, native integration trade-offs, and multi-file discovery.
- Use task agents for lint/build/test execution.
- Keep final architecture decisions, cross-feature integration, and documentation updates in the main agent.
