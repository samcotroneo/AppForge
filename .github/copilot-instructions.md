# Copilot instructions for AppForge

## Stack
- Vite
- SolidJS with TSX
- Tailwind CSS v4
- DaisyUI
- Capacitor
- PWA via `vite-plugin-pwa`

## File placement
- `src/app`: route-level composition and app shell wiring
- `src/components`: reusable presentational building blocks
- `src/features`: domain features with colocated types and helpers
- `src/lib`: shared utilities and platform adapters
- `src/features/bootstrap/starterContract.ts`: machine-readable summary of the base app and fresh-repo sequence

## Bootstrap workflow
- Use `npx @samcotroneo/appforge init` to pull the starter into a fresh repo before specializing the app.
- Use `--targets` when you need to skip the interactive native target prompt in automation.
- The init flow asks which native targets to prepare and writes `appforge.config.json` so the choice is easy to recover later.

## Coding expectations
- Keep SolidJS components small and composable.
- Prefer typed props and pure helper functions over inline data-munging inside JSX.
- Keep side effects isolated and easy to trace.
- Use DaisyUI component classes for semantic structure, then Tailwind utilities for spacing, grid, and responsive behavior.
- Treat Capacitor integration as an adapter boundary, not as logic scattered through feature components.

## Validation checklist
Always run:
- `npm run lint`
- `npm run test:unit`
- `npm run build`

## Sub-agent guidance
- Split complex work by feature area, platform integration, and documentation.
- Avoid parallel edits to the same feature folder.
- Keep final review and integration in the main agent after sub-agents finish.
