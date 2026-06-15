# Ember 4.0 Bump — Execution Plan

Branch: `dvonanderson/enhancement/ember-upgrade-4`

Prerequisite: 3.28 prep complete (native classes, `this.` templates, Validations `reopen()`, full test suite green).

Target for this phase: **Ember 4.0.x** (not 4.12 yet). Step through minors after 4.0 is stable.

---

## Phase 1 — Core framework (this branch)

### 1. Update core packages

| Package | 3.28 | 4.0 target |
|---------|------|------------|
| `ember-cli` | ~3.28.0 | ~4.0.1 |
| `ember-source` | ~3.28.0 | ~4.0.1 |
| `ember-data` | ~3.28.0 | ~4.0.2 |
| `ember-resolver` | ^7.0.0 | ^8.0.3 (4.0 blueprint; bump to ^11 at 4.12) |
| `@ember/test-helpers` | ^1.7.3 | ^2.9.3 |
| `ember-qunit` | ^4.6.0 | ^5.1.5 |
| `ember-cli-htmlbars` | ^5.7.2 | ^6.3.0 |
| `@ember/optional-features` | ^1.3.0 | ^2.0.0 |
| `ember-fetch` | ^7.1.0 | ^8.1.1 |

Keep `ember-cli-babel@^7.26.11` until all addons support babel 8 (required for EMT 5.0.0 pin).

### 2. Remove incompatible tooling

- Remove `ember-cli-template-lint` (broken AST plugin API on Ember 4; use standalone `ember-template-lint` via `lint:hbs`)
- Remove `ember-cli-bootstrap-datetimepicker` if still present (replaced by in-house `md-datetime`)

### 3. Pin addon compatibility (known from 3.28→4.x migration)

| Addon | Version | Notes |
|-------|---------|-------|
| `ember-models-table` | **5.0.0** (exact) | Only v5 release compatible with babel 7 |
| `ember-power-select` | ^7.2.0 | Downgrade from v8 for EMT v5 |
| `ember-power-select-with-create` | ^2.0.0 | Follows power-select v7 |

### 4. Config / import changes

```js
// app/resolver.js
import Resolver from 'ember-resolver/index';

// app/app.js
import Resolver from './resolver';
```

Do **not** use bare `import Resolver from 'ember-resolver'` — that resolves to the addon's Node entry point, not the Resolver class, and fails at runtime with `Could not find module ember-resolver`.

Update `config/ember-cli-update.json` blueprint version after successful bump.

### 5. Yarn resolutions (keep)

```json
{
  "ember-cli-babel": "^7.26.11",
  "ember-cli-htmlbars": "^6.3.0",
  "testem": "3.16.0"
}
```

---

## Phase 2 — Patches (before or during first build)

Create Yarn native patches (`.yarn/patches/`) or `patches/` via patch-package for:

1. **ember-pouch** — wrap `Ember.libraries.register` in `typeof Ember !== 'undefined'` guard (`patches/ember-pouch+7.0.0.patch`). Without this, vendor.js halts mid-load and downstream errors like `Could not find module ember-resolver/index` appear.
2. **ember-in-element-polyfill** — set `MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION` to `'3.20.0'`
3. **ember-cli-flash** — change `@ember/application/deprecations` import to `@ember/debug`; use `(has-block)` in flash-message template (`patches/ember-cli-flash+1.9.1.patch`)
4. **ember-resize** — import `oneWay` / `readOnly` from `@ember/object/computed`; replace removed `getWithDefault` with `get(...) ?? default` (`patches/ember-resize+0.3.4.patch`)
5. **ember-local-storage** — replace removed `@ember/application/deprecations` and `@ember/polyfills` imports (`patches/ember-local-storage+1.7.2.patch`). Update `app/adapters/application.js` to use `@classic` native class extending `ember-local-storage/adapters/local` (`.extend()` on Ember 4 produces a factory without `.create()`).
6. **ember-toggle** — use `(has-block)` instead of bare `hasBlock` in x-toggle template (`patches/ember-toggle+6.0.3.patch`; strict templates on Ember 4)

Force resolutions so nested copies use patched versions.

---

## Phase 3 — Build & test loop

```sh
yarn install
ember build
ember test --filter="Integration | Component | object/md attribute"
ember test   # full suite
```

Fix in order:

1. Build errors (resolver, vendor.js halts, template compiler)
2. Runtime boot errors (`{{#with}}`, `this-property-fallback` stragglers)
3. Addon incompatibilities (EMT theme, power-select helpers)
4. Test helper / QUnit API changes (`ember-qunit` v5)

---

## Phase 4 — Codemods (optional, after green build)

```sh
npx ember-cli-update -p ember-cli --from 4.0.3 --to 4.0.3 --run-codemods
# or individual codemods from stats-only list
```

Useful codemods: `ember-test-helpers-codemod`, `ember-qunit-codemod`, `deprecate-router-events-codemod`

---

## Phase 5 — Step to 4.12 LTS

After 4.0 is stable on CI:

```sh
npx ember-cli-update -p ember-cli --from 4.0.3 --to 4.12.3
```

Then bump `ember-resolver` to ^11.0.1, `ember-cli-babel` to ^8, reassess addon matrix.

---

## Checklist

- [ ] Core packages updated to 4.0.x
- [ ] `ember-cli-template-lint` removed
- [ ] Addon pins applied (EMT, power-select)
- [ ] `yarn install` clean
- [ ] `ember build` passes
- [ ] Full test suite green
- [ ] ember-pouch / in-element patches applied
- [ ] Smoke test: record edit main, dictionary attribute, distribution forms
