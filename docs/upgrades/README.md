# Ember Upgrade Docs

One file per upgrade leg. Each file records the target versions, every breaking change encountered, and the fix applied — including addon compatibility issues and patching decisions.

## Process

1. Run `npx ember-cli-update` at the start of each upgrade to get the config/blueprint diff.
2. Work through breaking changes. Document each one in the relevant file as you go.
3. Update the addon compatibility matrix when a version changes.
4. When the upgrade lands on `develop`, mark the checklist items complete.

## Upgrade Log

| File | From | To | Status |
|---|---|---|---|
| [ember-3.28-to-4.0.md](ember-3.28-to-4.0.md) | 3.28 LTS | 4.12 LTS | In progress |
| [ember-4.12-to-5.x.md](ember-4.12-to-5.x.md) | 4.12 LTS | 5.x | Planned |

## Tools

- [`ember-cli-update`](https://github.com/ember-cli/ember-cli-update) — applies upstream blueprint changes between versions
- [`ember-try`](https://github.com/ember-cli/ember-try) — test against multiple Ember versions
- Yarn native patches (`.yarn/patches/`) — for addons that need source fixes
