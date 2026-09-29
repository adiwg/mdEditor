# Ember Upgrade: 3.28 → 4.x

## Overview

- **Source LTS**: Ember 3.28 (ember-source, ember-cli, ember-data all `~3.28.0`)
- **Target LTS**: Ember 4.12
- **Migration branch**: `ember-migration` (prep on 3.28, then merge to `develop`)
- **Tool**: [`ember-cli-update`](https://github.com/ember-cli/ember-cli-update) — run at each version step to apply config/blueprint diffs

---

## Pre-Migration Checklist

- [x] App on Ember 3.28 LTS (final 3.x LTS — stable jumping-off point)
- [x] `@ember/optional-features` installed
- [x] `ember-classic-decorator` in place (`@classic` on all non-native components)
- [x] Yarn 4 (Berry) patch infrastructure in place
- [x] All `@test` suite green on 3.28 before branching

---

## Breaking Changes and Resolutions

### 1. `this-property-fallback` removed

**What broke**: In Ember 4.0, bare property references in templates (`{{model}}`, `{{parentModel}}`) no longer fall through to `this`. Every template value must be explicit.

**Fix**: ~250 references across ~60 files prefixed with `this.`:
- `model` → `this.model`
- `parentModel` → `this.parentModel`
- `scrollTo`, `columns`, and other top-level getters similarly prefixed

**Exemptions** (do NOT add `this.`):
- Block params: `{{#each list as |item|}}` — `item` is local scope
- Component/helper invocation names: `{{my-component}}`, `{{my-helper}}`

---

### 2. `this._super()` vs `super.methodName()` — when to use which

**Classic `.extend()`** (`Model.extend`, `Component.extend`, `EmberObject.extend`, `Indicator.extend`, etc.):

- Always use **`this._super(...arguments)`** in every hook, including `init`.
- **Do not** use `super.init(...arguments)` — it throws `(intermediate value).init is not a function` because `.extend()` is not a real ES6 class hierarchy.
- Applies to `app/models/*`, nested `templateClass = EmberObject.extend({ ... })`, and addons such as `control/md-indicator/related`.

**Native classes** (`export default class Foo extends Route` / `@classic class Foo extends Component`):

- Use **`super.methodName(...arguments)`** for lifecycle hooks (`init`, `setupController`, `afterModel`, `didReceiveAttrs`, `willDestroy`, etc.).
- On Ember 4, `this._super()` in non-`init` hooks on native classes is unreliable; prefer `super` for those routes and components.

**Examples**:

```js
// Classic model — keep _super on 3.28 and in init on Ember 4
const Setting = Model.extend({
  init() {
    this._super(...arguments);
  },
});

// Native route — use super for lifecycle hooks
export default class ContactRoute extends Route {
  setupController(controller, model) {
    super.setupController(controller, model);
  }
}
```

---

### 3. Implicit service injections removed

**What broke**: Controllers and routes that used `store` without an explicit `@service` decorator.

**Fix**: Add explicit injection wherever `store` (or any service) is used without `@service`:
```js
import { service } from '@ember/service';

@service store;
```

---

### 4. `{{#with}}` helper removed

**What broke**: `{{#with}}` was removed entirely from Ember 4. It was used in ~40 template files, including `md-nav-sidebar/template.hbs` which renders on every page — causing a full render crash.

**Symptom**: `Error: Attempted to resolve 'with', which was expected to be a helper, but nothing was found` — entire page blank.

**Fix**:
```hbs
{{!-- Before --}}
{{#with expr as |var|}}...{{/with}}

{{!-- After (with null-check) --}}
{{#let expr as |var|}}{{#if var}}...{{/if}}{{/let}}

{{!-- After (always-truthy alias) --}}
{{#let expr as |var|}}...{{/let}}

{{!-- Before (pure truthy check, no as) --}}
{{#with expr}}...{{/with}}

{{!-- After --}}
{{#if expr}}...{{/if}}
```

**40 files fixed** across `app/pods` and `lib`.

---

### 5. `{{partial}}` removed

**What broke**: `{{partial 'template/name'}}` removed in Ember 4.

**Fix**: Replace with component invocation:
```hbs
{{!-- Before --}}
{{partial column.template}}

{{!-- After --}}
{{component column.template record=record column=column}}
```

Found in `lib/ember-leaflet-table/app/templates/components/leaflet-table/row.hbs`.

Note: `{{render}}` was also removed — not present in this codebase.

---

### 6. `ember-in-element-polyfill` class constructor error

**Error**: `Class constructor InElementTransform cannot be invoked without 'new'`

**Root cause**: `ember-in-element-polyfill@0.2.2` hardcodes `MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION = '10.0.0'` (a placeholder). Since `4.12 < 10.0.0`, the polyfill tries to apply a broken AST transform.

**Fix**: Yarn native patch in `.yarn/patches/` changes the threshold to `'3.20.0'`. Package.json resolutions force ALL nested copies to the patched version (transitive deps from `ember-leaflet-layer-control` → `ember-leaflet` pull in `@0.1.3`).

---

### 7. `ember-cli-template-lint` visitor API break

**Error**: `Cannot read properties of undefined (reading 'visitor')`

**Root cause**: `ember-cli-template-lint@1.0.0-beta.3` registers a constructor-style AST plugin (`RemoveConfigurationHtmlCommentsPlugin`) with `.prototype.transform`. Ember 4's template compiler expects function-style plugins returning `{ visitor: {...} }`.

**Fix**: Removed `ember-cli-template-lint` from devDependencies entirely. Template linting is handled by standalone `ember-template-lint` via npm scripts (`lint:hbs`).

---

### 8. `ember-power-select` v7/v8 conflict

**Root cause**: `ember-models-table@5.0.0` depends on `ember-power-select@^7.1.1`. Root package had `@8.12.1` (v2 Embroider addon). Nested v7 re-exports tried to resolve against the v2 root — the `ember-power-select-is-selected` helper was renamed to `ember-power-select-is-selected-present` in v8.

**Fix**: Downgraded:
- `ember-power-select` → `^7.2.0`
- `ember-power-select-with-create` → `^2.0.0` (requires `ember-power-select@^7`)

---

### 9. `ember-pouch` halts vendor.js execution

**Error** (misleading): `Could not find module ember-resolver`

**Actual root cause**: `ember-pouch@7.0.0` emits `vendor/ember-pouch/register-version.js` containing a bare `Ember.libraries.register(...)` call. In Ember 4, the `Ember` global is not defined at the point this executes (vendor.js line ~78257). The uncaught `ReferenceError` **halts all subsequent AMD module definitions**, including `ember-resolver` at line ~155109.

**Fix**: Yarn patch wraps the call:
```js
if (typeof Ember !== 'undefined') {
  Ember.libraries.register(...);
}
```

---

### 10. `ember-resolver` import path change

**What changed**: `ember-resolver@7` → `ember-resolver@11.0.1` (designed for Ember 4.x). The import path changed.

**Fix**:
```js
// app/resolver.js
import Resolver from 'ember-resolver/index'; // not bare 'ember-resolver'

// app/app.js
import Resolver from './resolver';
```

---

### 11. `ember-models-table` v5 babel constraint

**Constraint**: `ember-models-table@5.0.0` is the ONLY v5 release compatible with `ember-cli-babel@^7.x`. v5.1.0+ requires `ember-cli-babel@8`, which breaks `ember-tooltips` and other addons.

**Fix**: Pin to exactly `ember-models-table@5.0.0`.

Also: EMT v5 changed the theme system from CSS classes to services — see branch for full migration.

---

### 12. `ember-tooltips` `@ember/string` deprecation

**Symptom**: Deprecation warnings about `@ember/string` on every render.

**Fix**: Silenced via `registerDeprecationHandler` in `app/app.js` (intentional suppression — not a fix to the underlying addon).

---

### 13. `ember-cli-bootstrap-datetimepicker` incompatibility

**What broke**: This addon relies on jQuery UI patterns that conflict with Ember 4.

**Fix**: Replaced with in-house native HTML date inputs in the `md-datetime` component. Addon removed from devDependencies.

---

### 14. Stale nested `ember-cli-htmlbars@4.5.0`

**Error**: `Ember is not defined` in unexpected places.

**Root cause**: A stale nested `ember-cli-htmlbars@4.5.0` in `node_modules` causes incorrect template compilation.

**Fix**: Force resolution to `^5.7.2` in `package.json` resolutions. Clean `node_modules` if the old version persists.

---

### 15. `Component.extend(Validations)` + native `@classic` class hybrids

**What broke**: Object form components migrated to `@classic class extends Component.extend(Validations)` with `alias()` / `@computed` / `@alias` defined on the **class body**. ember-cp-validations + the native-class hybrid does not install those macros on the prototype correctly.

**Symptom**: Rendering a child input with a bound alias value (e.g. `value=this.definition`) passes the **ComputedProperty decorator object** instead of the string value:

```
Assertion Failed: EmberObject.create no longer supports defining computed properties.
Define computed properties using extend() or reopen() before calling create().
```

Stack trace points at a child component (`input/md-textarea`, `input/md-input`, etc.) — the bug is on the **parent** form component.

**Fix**: Keep the native class for lifecycle hooks; move all computed macros to **`reopen()`** after the class:

```js
@classic
export default class MdAttributeComponent extends Component.extend(Validations) {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    // ...
  }
}

MdAttributeComponent.reopen({
  definition: alias('model.definition'),
  domainList: computed('domains.{@each.domainId,@each.codeName}', function () {
    // ...
  }),
});
```

**Do NOT** use on the class body for these hybrids:
- `definition = alias('model.definition')`
- `@alias('model.definition') definition`
- `@computed(...) get domainList() { ... }`

**Applies to**: All ~30 `object/md-*` form components using `Component.extend(Validations)`. Same pattern as `md-codelist-multi` and `control/md-indicator/related` when overriding parent computeds.

**Deferred**: Converting these forms off `Component.extend(Validations)` entirely — wait until the Ember 4 bump when ember-cp-validations usage can be reassessed.

---

### 16. `input/md-month` and `extraFormats`

**What broke**: After native-class conversion, `extraFormats` was a native getter; `_date` parsing in `md-datetime` did not include `extraFormats` when parsing bare `date="10"` values.

**Fix**:
- `MdMonthComponent.reopen({ extraFormats: computed(function () { return ['MM', 'M', 'MMM']; }) })`
- `md-datetime` `_date` computed depends on `'extraFormats.[]'` and includes them in moment format list
- Test uses `this.set('date', '10')` + `date=this.date` (not bare `date="10"`)

---

### 17. `selectedItems` getter — Ember array methods on IdentifierArray

**What broke**: `this.data.filterBy(prop).toArray()` fails because `this.data` may be an `IdentifierArray` in Ember 4, which doesn't always expose Ember array methods directly.

**Fix**:
```js
// Before
return A(this.data.filterBy(prop).toArray());

// After
return A(A(this.data).filterBy(prop));
```

---

## Patching Strategy (Yarn 4 Berry)

`patch-package` has issues with Yarn 4's resolution format. Use Yarn native patching instead:

```sh
# Create a patch
yarn patch <package-name>
# ... make changes in the temp dir ...
yarn patch-commit -s <temp-dir>
```

This creates patches in `.yarn/patches/` and auto-updates `package.json` resolutions. The legacy `patches/` directory (for `patch-package` postinstall) still works for packages not yet migrated.

---

## Addon Compatibility Matrix (as of migration)

| Addon | 3.28 version | 4.x status | Notes |
|---|---|---|---|
| ember-source | ~3.28.0 | ~4.12.0 | Target LTS |
| ember-cli | ~3.28.0 | ~4.12.0 | |
| ember-data | ~3.28.0 | ~4.12.0 | |
| ember-resolver | ^7.0.0 | ^11.0.1 | Import path changed |
| ember-models-table | 3.4.0 | 5.0.0 | Pin to exactly 5.0.0 |
| ember-power-select | ^8.12.1 | ^7.2.0 | Downgraded for EMT v5 compat |
| ember-power-select-with-create | ^3.1.0 | ^2.0.0 | Follows power-select |
| ember-pouch | ^7.0.0 | ^7.0.0 (patched) | Yarn patch for Ember global |
| ember-in-element-polyfill | ^0.2.2 | ^0.2.2 (patched) | Yarn patch for version threshold |
| ember-cli-template-lint | ^1.0.0-beta.3 | removed | Replaced by standalone ember-template-lint |
| ember-cli-bootstrap-datetimepicker | ~0.9.4 | removed | Replaced with native HTML date input |

---

## What's Next: 4.0 → 4.12 LTS

- [ ] Audit remaining deprecations introduced between 4.0 and 4.12
- [ ] Evaluate Embroider readiness (current build uses classic pipeline)
- [ ] Assess `ember-data` 4.x model/store API changes
- [ ] Evaluate moving off `@classic` toward native Glimmer components incrementally
- [ ] Run `ember-cli-update` at each minor step (4.0 → 4.4 → 4.8 → 4.12)
