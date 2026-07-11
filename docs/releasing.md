# AppForge npm release guide

Use this path if you want the simplest experience for agents and humans:

- `npx @samcotroneo/appforge init`
- public npm publication
- semver-based version bumps

## One-time setup

1. Create an npm account and enable 2FA.
2. Make sure the scoped package name is available on npm.
3. Log in locally:

   ```bash
   npm login
   ```

4. Add a `publishConfig` so the package publishes publicly by default:

   ```json
   {
     "publishConfig": {
       "access": "public"
     }
   }
   ```

## Versioning policy

Use semantic versioning:

- `patch` for docs, copy, CLI text, and bug fixes
- `minor` for new CLI flags, new starter features, or new guidance surfaces
- `major` for breaking changes to the init flow, package layout, or generated repo contract

Prefer `npm version` so npm creates the tag and updates `package.json` in one step.

## Release flow

1. Run validation:

   ```bash
   npm run lint
   npm run test:unit
   npm run build
   ```

2. Bump the version:

   ```bash
   npm version patch
   # or: npm version minor
   # or: npm version major
   ```

3. Publish:

   ```bash
   npm publish
   ```

4. Push the version commit and tag:

   ```bash
   git push --follow-tags
   ```

## CI recommendations

If you automate publishing in GitHub Actions:

- use a manual `workflow_dispatch` release workflow instead of publishing on every push to `main`
- run the same validation steps first
- use `NODE_AUTH_TOKEN` from an npm automation token secret
- publish from a deliberately chosen ref or version bump
- keep `prepublishOnly` in `package.json` so accidental publishes still get blocked if validation fails

## Notes

- The command is driven by the scoped npm package name, so keep the README and starter contract in sync with the published scope.
- If you later move to GitHub Packages, the same scoped command shape still works.
