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

2. Create and push a semver tag — the CI pipeline handles the rest:

   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

   The publish workflow fires on any tag matching `v*.*.*`, strips the `v` prefix, syncs `package.json`, runs the full validation suite, and publishes to npm.

3. *(Optional)* If you also want the version reflected in the commit, bump it locally first:

   ```bash
   npm version patch   # or minor / major
   git push --follow-tags
   ```

   `npm version` updates `package.json`, commits it, and creates the tag in one step.

## CI recommendations

If you automate publishing in GitHub Actions:

- push a semver tag (`v1.2.3`) to trigger the publish workflow automatically
- the workflow extracts the version from the tag and syncs it into `package.json` before publishing, so the npm release always matches the tag
- a `workflow_dispatch` trigger is still available for manual runs when you need to publish from a specific ref without tagging
- run the same validation steps first
- use npm Trusted Publishing (OIDC) so no `NPM_TOKEN` secret is required
- keep `prepublishOnly` in `package.json` so accidental local publishes still get blocked if validation fails

## Notes

- The command is driven by the scoped npm package name, so keep the README and starter contract in sync with the published scope.
- If you later move to GitHub Packages, the same scoped command shape still works.
