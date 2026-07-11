# Agent workflows for AppForge

## When to use sub-agents

Use sub-agents when a change naturally decomposes into parallel tracks with low overlap.

### Good delegation boundaries
- **Feature exploration:** research auth, sync, payments, or notifications independently before implementation.
- **Platform spikes:** isolate Android, iOS, and browser-specific investigations.
- **UI decomposition:** split a large experience into shell, feature cards, forms, and supporting docs.
- **Validation:** delegate repetitive lint/build/test runs to task-focused agents.

### Avoid delegation when
- One decision changes the structure of multiple feature folders.
- The work is mostly integration, naming, or shared state design.
- Multiple agents would likely touch the same files.

## Recommended workflow

1. **Main agent** defines the outcome, feature boundaries, and acceptance criteria.
2. **Explore/research agents** gather implementation options and constraints.
3. **Implementation agents** work inside separate folders or feature areas.
4. **Main agent** integrates the work, resolves overlaps, and updates architecture docs.
5. **Task agent** runs lint, tests, and build.

## Template-specific guidance

- Keep `src/app` ownership with the main integrator when possible.
- Delegate within `src/features/<feature-name>` for the cleanest merge boundaries.
- Put native or PWA-specific changes behind `src/lib` so platform concerns do not leak into UI composition.
- Treat `src/features/bootstrap/starterContract.ts` as the canonical base-app contract for fresh-repo bootstraps.
- Treat `appforge.config.json` as the generated bootstrap record for native target selection.
- Treat `README.md`, `CLAUDE.md`, and `.github/copilot-instructions.md` as shared contracts that should be updated whenever architecture expectations change.
- When a fresh repo asks to build on AppForge, run `npx @samcotroneo/appforge init` (use `--targets` in automation if needed), read the starter contract first, then specialize the sample app instead of rewriting the shell from scratch.
