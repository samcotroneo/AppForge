# AppForge template

AppForge is a self-contained starter for building production-minded cross-platform apps with **Vite**, **SolidJS + TSX**, **Tailwind CSS**, **DaisyUI**, **Capacitor**, and **PWA** defaults.

The folder is intentionally independent from `dinnerbrain-app` so it can be promoted into its own repository later with minimal cleanup.

## What this starter includes

- A working app shell with dashboard, workspace, and settings screen structure
- A feature-first layout under `src/app`, `src/components`, `src/features`, and `src/lib`
- Shared loading, empty, and error states for future product slices
- A reference workspace feature that demonstrates route composition and domain-specific UI boundaries
- Capacitor configuration targeting `dist/`
- `vite-plugin-pwa` with installable manifest and generated service worker
- Lint, unit test, and build scripts for automation and CI
- Copilot/Claude guidance files for agent-friendly implementation workflows

## Quick start

```bash
cd /home/runner/work/Dinnerbrain/Dinnerbrain/appforge
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run test:unit
npm run build
```

## Runtime configuration

Create an `.env` or `.env.local` file when you start wiring live services. The starter reads public runtime
configuration from `src/lib/env.ts`.

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_PUBLIC_AUTH_CLIENT_ID=your-public-client-id
VITE_ENABLE_MOCK_DATA=false
VITE_ENABLE_EXPERIMENTAL_WORKSPACE=false
```

Keep actual values app-specific. AppForge defines the typed access layer and variable names, but downstream apps
should provide their own public endpoints, auth client IDs, and release flags.

## Starter foundations

- `src/lib/bootstrap.ts` owns async startup, config summary creation, session restore, and platform checks.
- `src/lib/navigation.ts` defines the URL-driven route policy so deep links and back-button behavior stay explicit.
- `src/lib/persistence.ts` centralizes storage keys, schema versioning, and offline-safe reads/writes.
- `src/lib/session.ts` defines the generic auth/session boundary without locking the template to a specific provider.
- `src/lib/network.ts`, `src/lib/data.ts`, and `src/lib/observability.ts` define the seams for API clients, repositories, sync queues, logging, analytics, and error reporting.
- `src/lib/featureFlags.ts` keeps starter flags defined in one place instead of scattering environment conditionals.
- `src/lib/designSystem.ts` captures app-level UI rules beyond raw reusable components.

## Testing seams

- Put pure helper and policy tests beside each lib module, for example `src/lib/*.test.ts`.
- Keep feature logic tests near the feature folder, for example `src/features/<feature-name>/*.test.ts`.
- Keep route metadata and route-policy tests near `src/app`.
- Treat TSX views as thin composition layers and prefer testing the pure helpers or adapters they depend on.

## Native packaging

```bash
npx cap add android
npx cap add ios
npm run cap:sync
npx cap open android
npx cap open ios
```

## Starter structure

```text
appforge/
├── .github/copilot-instructions.md
├── CLAUDE.md
├── capacitor.config.ts
├── docs/
│   └── agent-workflows.md
├── public/
│   ├── favicon.svg
│   └── icons/
├── src/
│   ├── app/
│   │   ├── screens/
│   │   └── routes.ts
│   ├── components/
│   │   ├── feedback/
│   │   ├── shell/
│   │   └── ui/
│   ├── features/
│   │   └── workbench/
│   ├── lib/
│   ├── manifest.ts
│   ├── styles.css
│   └── index.tsx
├── eslint.config.js
├── package.json
└── vite.config.ts
```

## Architecture defaults

- Put route-level composition and screen ownership under `src/app`.
- Keep reusable presentational components under `src/components`.
- Keep domain-specific features under `src/features/<feature-name>`.
- Put platform adapters and shared utilities under `src/lib`.
- Keep components thin: colocate types, fixtures, and pure helpers outside the TSX view whenever possible.
- Use shared empty, loading, and error states so product flows stay consistent from the first slice.
- Use DaisyUI for semantic UI primitives, then apply Tailwind utilities for layout and spacing.

## Working with agents

- Copilot guidance lives in `.github/copilot-instructions.md`.
- Claude guidance lives in `CLAUDE.md`.
- Deeper sub-agent delegation guidance lives in `docs/agent-workflows.md`.

## Moving this folder into its own repository

1. Copy `appforge/` into a new repository root.
2. Run `npm install`.
3. Update package metadata, app name, Capacitor IDs, and PWA manifest values.
4. Add native platforms with `npx cap add android` and/or `npx cap add ios`.
5. Replace the seeded workspace data with your first real feature service and product screens.
