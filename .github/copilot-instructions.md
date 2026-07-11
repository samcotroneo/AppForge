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
