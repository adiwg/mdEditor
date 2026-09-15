# Ember Upgrade: 4.12 → 5.x

## Overview

- **Source LTS**: Ember 4.12
- **Target LTS**: 5.8 (`ember-cli`/`ember-data`/`ember-source` all `~5.8.0`)
- **Branch**: `dvonanderson/spike/liquid-fire-ember-5-4`
- **Status**: Substantially complete on this branch, not yet merged to `develop`
- **Prerequisite**: `ember-3.28-to-4.0.md` upgrade complete

This leg started as a narrow spike — does `liquid-fire` survive an Ember 5.x bump? — but grew into a real architecture change once that investigation surfaced that the app's actual persistence was plain browser `localStorage` (via `ember-local-storage`) the whole time; PouchDB was only ever a secondary "linked copy" created on explicit opt-in. See [Storage Architecture Change](#storage-architecture-change-record-contact-dictionary-now-live-directly-in-pouch) below for that part.

**Version path**: tried `~5.4.0` first, hit an unfixable-in-app Glimmer bug (see #5 below), bumped straight to `~5.8.0` where it resolved on its own. **Recommendation: skip 5.4, target 5.8+ directly.**

---

## Pre-Migration Checklist

- [x] App on Ember 4.12 LTS
- [x] All tests green on 4.12 before branching
- [x] liquid-fire compatibility assessed
- [x] ember-data 4.x → 5.x API changes reviewed (Store rewrite, RequestManager)
- [x] Real pre-existing user data path tested (migration script vs. an actual pre-collapse export, not just synthetic fixtures)

---

## liquid-fire compatibility (the original spike question)

**Verdict: no evidence of incompatibility.** Once the app was fixed enough to actually render (see the bugs below — none of which are liquid-fire's fault), pages rendered, sidebar counts updated, and route transitions worked with zero liquid-fire-specific errors anywhere in the console across the whole spike. Every crash traced to ember-data/ember-source/Glimmer internals, never to `liquid-fire`, `{{liquid-if}}`, or `app/transitions.js`'s ~35 route-transition-map entries.

A separate "tables disappear on refresh" bug, initially suspected to be a liquid-fire issue, turned out to be a downstream symptom of the migration-hang/schema-warmup bugs below (repeated failed `beforeModel` retries interrupting an in-flight liquid-fire transition mid-flight) — see bug #7. Once those were fixed, the symptom stopped reproducing.

**How to apply to the real migration**: don't budget migration time worrying about liquid-fire specifically. The Store rewrite and the reactive-array/warp-drive-reactivity issues below are the real cost centers.

---

## Breaking Changes and Resolutions

### 1. `ember-classic-decorator` crashes on first `require()`, aborting all of `vendor.js`

**What broke**: `ember-classic-decorator`'s runtime shim patches `window.require` so the *first* module resolution triggers unconditional `WeakMap.set(SomeEmberOrDataClass, bool)` calls against a hardcoded list (`Ember.ObjectProxy`, `DS.Adapter`, `DS.Transform`, etc.). Several no longer exist under Ember/ember-data 5.x. `WeakMap.set(undefined, ...)` throws `TypeError: Invalid value used as weak map key` at the top level of `vendor.js`, aborting every `define(...)` call positioned after it — making unrelated modules (ember-cli-flash, ember-leaflet, etc.) look "missing."

**Fix**: Yarn native patch (`.yarn/patches/ember-classic-decorator-*.patch`) guards every `WeakMap.set()` call with an existence check. Confirmed `ember-classic-decorator@4.0.0` (latest at the time) has the identical unguarded code — bumping the addon version does not fix this, only patching does.

---

### 2. `ember-cli-flash` needs a version bump

**What broke**: `3.0.0`'s auto-injecting initializer imports a module the newer build's classic AMD loader can't resolve.

**Fix**: Bumped to `^4.0.0` — the last version before `5.0.0`'s V2 rewrite (which drops the auto-injecting initializer entirely and would require every consumer to explicitly `@service flashMessages`).

---

### 3. `ember-local-storage` can't resolve `@ember-data/adapter/json-api`

**What broke**: Ember-data 5.x split into scoped `@ember-data/*` packages that are webpack/ember-auto-import-only, never registered in the classic AMD loader. `ember-local-storage`'s adapter does a bare-specifier import expecting classic resolution. The addon only declared `ember-auto-import` as a devDependency (for its own test app), not a real dependency, so ember-cli never activated per-addon webpack bundling for its shipped code.

**Fix**: Yarn patch moves `ember-auto-import` from `devDependencies` to real `dependencies` — the general pattern for giving any V1 addon modern bare-specifier resolution without a full V2 rewrite.

---

### 4. `ember-pouch`'s `@ember/polyfills` removal

**What broke**: `@ember/polyfills` no longer exists at all in 5.x (a hard removal, not a deprecation this time). Two files did `import { keys, assign } from '@ember/polyfills'`.

**Fix**: Deleted the imports, use `Object.keys`/`Object.assign` directly (yarn-patched on top of the existing ember-pouch patch — **remember to re-apply prior patch hunks to the freshly-extracted pristine source before adding new changes**, `yarn patch <pkg>` always re-extracts from the published package, not any previously-applied patch).

---

### 5. Genuine ember-source bug: `ember-babel` missing `arrayLikeToArray`/`objectWithoutPropertiesLoose`

**What broke**: The very first real Glimmer render (not just boot/route-model-resolving) crashed with `TypeError: (0, _emberBabel.arrayLikeToArray) is not a function`. Reproduced identically on 5.4 and 5.8 — this is what made 5.4 look unfixable-in-app.

**Root cause**: `node_modules/ember-source/dist/packages/ember-babel.js` defines `arrayLikeToArray` as a **private, non-exported** function, and doesn't define `objectWithoutPropertiesLoose` at all. Other `@glimmer/*` packages' compiled output calls both *from* the "ember-babel" module. A real gap in ember-source's own bundled babel-helper shim, not an app-code issue.

**Fix**: Yarn patch on `ember-source@5.8.0`'s `dist/packages/ember-babel.js` — adds `export` to `arrayLikeToArray`, adds a standard `objectWithoutPropertiesLoose` implementation. No app-level workaround exists; has to be patched in ember-source itself.

---

### 6. ember-data 5.x needs a hand-built modern `Store` service

**What broke**: This app never had a custom `app/services/store.js` before. Under ember-data 5.8, the base `Store` class needs five separate pieces of manual wiring to keep working with classic `Model`/`Adapter`/`Serializer` code — each missing piece produces a different, unrelated-looking crash:

1. `requestManager` (`RequestManager` from `@ember-data/request`, `.use([LegacyNetworkHandler, Fetch]).useCache(CacheHandler)`) — missing → `Cannot read properties of undefined (reading 'request')`.
2. `adapterFor`/`serializerFor`/`pushPayload`/`normalize`/`serializeRecord` delegating to `@ember-data/legacy-compat`'s free functions — missing → `store.adapterFor is not a function`.
3. `createSchemaService()` returning `buildSchema(this)` from `@ember-data/model` — missing → `this.createSchemaService is not a function`.
4. `createCache(storeWrapper)` returning `new JSONAPICache(storeWrapper)` from `@ember-data/json-api` — missing → `this.createCache is not a function`.
5. `instantiateRecord`/`teardownRecord` delegating to `@ember-data/model`'s exports — missing → records never actually instantiate from `findAll()`.

**Fix**: See `app/services/store.js` for the full working shape (~50 lines, every line load-bearing). Also required: the old `Store.reopen({exportSelectedData(...) {...}})` pattern no longer works — `.reopen()` isn't available on the modern `Store` class; moved to a real method on `ExtendedStoreService extends Store`.

---

### 7. Genuine ember-data 5.8 bug: `modelFor`'s legacy shim recurses infinitely against `buildSchema()`

**What broke**: `RangeError: Maximum call stack size exceeded`, first noticed via `Settings` service's `store.findAll('setting')`.

**Root cause**: `@warp-drive/core`'s `Store.prototype.modelFor(type)` (installed by default via `ENABLE_LEGACY_REQUEST_METHODS`) returns a `ShimModelClass` whose `.attributes` getter calls back into `schema.fields({type})`. `@ember-data/model`'s `buildSchema()` schema provider's `_loadModelSchema(type)` calls `store.modelFor(type)` to get the real Model class. Together: resolving schema for X → `_loadModelSchema(X)` → `store.modelFor(X)` → `ShimModelClass` (not the real class) → `.attributes` → `schema.fields({type: X})` again → infinite recursion.

**Fix**: In `app/services/store.js`'s `createSchemaService()` override, `_loadModelSchema` resolves the real Model class via `getOwner(store).factoryFor('model:'+type).class` directly instead of through the shimmed `store.modelFor()`.

**Downstream consequence, found much later**: any code that calls `store.createRecord(type, ...)` before *anything else* has touched that type on this store hits a related assertion — `Error: Accessing schema information on Models without looking up the model via the store is disallowed` — because the class never got tagged via a real `store.modelFor(type)` lookup. This bit the Pouch migration script, the dev-data seeder, a test fixture helper, and (still open, see [What's Next](#whats-next)) a pre-existing `setting-test.js` unit test that creates a `setting` record as its very first store interaction. **Fix pattern**: call `store.modelFor(type)` once before the first `createRecord` for that type in any code path that might run before the rest of the app has warmed it up.

---

### 8. ember-data 5.x's reactive `findAll()` arrays reject arbitrary property writes

**What broke**: `app/routes/application.js` and `app/services/pouch.js` both mutated a `findAll()` result directly (`item.meta = someDescriptor`) to smuggle sidebar-nav metadata alongside the record list. Under ember-data 5.x, `findAll()`'s result is a `Proxy`-backed reactive array that rejects unknown property assignment outright: `TypeError: 'set' on proxy: trap returned falsish for property 'meta'`.

**Fix**: Both call sites return a plain wrapper object `{ list: <the array>, meta: <the descriptor> }` instead of mutating the array — a template-touching refactor (`section` → `section.list` everywhere the array itself is consumed, `section.meta.x` unchanged). Affected: `application.js`, `records/contacts/dictionaries` list routes, `md-nav-sidebar`, `export/route.js`, `sync/list`, `services/pouch.js`.

**How to apply elsewhere**: grep for `\.meta\s*=` / `set(\w+, 'meta'` near any `store.findAll(...)` result — this is specifically about the *array wrapper* being mutated, not about mutating individual records inside it (those still `set()` normally).

---

## Storage Architecture Change: record/contact/dictionary now live directly in Pouch

Triggered by realizing the app's actual persistence was `ember-local-storage` the whole time — PouchDB was only ever a secondary "linked copy" created on explicit sync opt-in, used purely as CouchDB's replication staging area.

### What changed

- `record`/`contact`/`dictionary` (via `app/models/base.js`) are now directly Pouch-backed: `app/adapters/{record,contact,dictionary}.js` extend `ember-pouch`'s `Adapter`, each with a `generateIdForRecord` copied from the old `ember-local-storage` adapter.
- Old `pouch-record`/`pouch-contact`/`pouch-dictionary` model+adapter+serializer files (9 files) and `models/pouch-base.js` deleted. `adapters/pouch-base.js`/`serializers/pouch-base.js` (shared `initDb()`/`unloadedDocumentChanged` helpers) kept.
- New `syncEnabled: attr('boolean', {defaultValue: false})` on `base.js` replaces the old "does a linked pouch-record doc exist" check. `services/couch.js`'s push/pull/sync pass `{filter: doc => doc.data?.syncEnabled === true}` so only flagged docs replicate.
- `services/pouch.js` rewritten: the sync-candidates table is filtered to `syncEnabled` records only; enabling/disabling sync just flips the flag + saves instead of creating/destroying a second doc.
- `setting`/`profile`/`custom-profile`/`couch` deliberately stayed on `ember-local-storage` — not part of the collapse.

### One-time migration for pre-existing installs

`app/utils/pouch-migration.js` scans raw `records-*`/`contacts-*`/`dictionaries-*` `localStorage` keys directly (the adapter that wrote them is deleted) and recreates each record through the new Pouch-backed models, gated on a `mdeditor:pouch-migration-complete` flag, idempotent.

**Tested against a real pre-collapse export** (2026-09-14, `_ak-mdTest-fullset-20231105.json` — 23 records/25 contacts/1 dictionary of genuine mdEditor v1.0.1-era data, not hand-built fixtures) and found a real bug the earlier synthetic testing had masked:

**Bug**: `denormalizeAttributes` passed the old `json` attribute straight through to `store.createRecord()` unparsed. The old adapter's `json` transform always serializes to a JSON-encoded *string*; `createRecord()` bypasses the transform (it only runs on data coming back *from* the adapter), so the raw string landed on the record's `json` property as-is. The record still saved without error — but the transform then double-encoded that already-a-string value on save, and reading it back later threw `Assertion Failed: EmberObject.create only accepts objects`. The 2026-09-04 synthetic test fixtures had used a plain object literal for `json`, which happens to be exactly what a *correctly parsed* value looks like — the bug and the test data's mistake canceled out, so only a genuine export (a real string) exercised the actual broken path.

**Secondary symptom, same root cause**: with real data, migration appeared to hang indefinitely on one specific record. Not a true hang — the double-stringified corruption made that one save pathologically slow (a background retry eventually finished all 49 items ~10 minutes later, fully corrupted). Fixed, the same dataset now migrates in well under 10 seconds.

**Fix**: `denormalizeAttributes` now `JSON.parse()`s the `json` string (guarded by `typeof`, with a try/catch that drops the field on malformed data rather than failing the whole record).

### Dev/test fixture seeding

Grew out of the real-data migration test — since this app has no HTTP data layer (everything is direct-to-Pouch), a Mirage-style mock doesn't fit. Built a curated real-data seeder instead:

- `public/dev-fixtures/sample-metadata.json` — a hand-picked, internally-consistent slice of the same real export (5 records across different resource types, the 6 contacts they actually reference, 1 dictionary). Served as a static fetch, not bundled as an `app/` module.
- `app/utils/dev-seed-data.js`'s `seedSampleDataIfEmpty(store)` — called from `application.js`'s `beforeModel`, gated to `environment === 'development'`, no-ops once any record exists.
- `tests/helpers/seed-sample-data.js` — opt-in per-test access to the same fixture (`createSampleRecord`/`createSampleContact`/`createSampleDictionary`) for tests that specifically want real-shaped complexity; most tests should keep using `tests/helpers/create-contact.js`'s minimal synthetic generator.
- **Build-config gap caught by explicitly checking**: `public/` ships into every build's `dist/` regardless of environment by default — the fixture file itself (not just the gated seeding *code*) was landing in production/staging builds as a public, downloadable static asset. Fixed with a `broccoli-funnel` exclusion in `ember-cli-build.js` keyed on `process.env.EMBER_ENV` (`development`/`test` keep it, `staging`/`production` strip it — verified by actually building both and inspecting the output).

### Local CouchDB for testing sync

`docker-compose.couchdb.yml` at repo root + `couchdb/local.d/cors.ini` (both tracked in git, committed `9862baa2`). **The CORS ini file must not be mounted `:ro`** — the official CouchDB image's entrypoint does a `chmod` over `/opt/couchdb/etc` under `set -e`; a read-only mount fails that chmod and kills the whole entrypoint silently (empty logs, instant exit). `docker compose -f docker-compose.couchdb.yml up -d` is sufficient on its own for CORS. Login in the app's Sync page: URL `http://localhost:5984`, db name `mdeditor`, the compose file's admin creds work directly for `pouchdb-authentication`'s cookie login.

---

## Other Notable Fixes From This Leg

- **`ember-cp-validations` `DS.ManyArray` instanceof crash** — ember-data 5.x's `DS` compat shim drops `DS.ManyArray` entirely; `x instanceof undefined` throws instead of being false. Yarn-patched to guard each constructor check independently.
- **`ember-pouch`'s `onChange` listener** reads `hasDirtyAttributes` unguarded (same broken-property family as #7); an uncaught throw skips a needed post-replication refresh, leaving `rev` stale and causing the next save to fail with a **409 conflict**. Yarn-patched with a `safeHasDirtyAttributes()` helper that fails toward "safe to refresh."
- **`record/new/id/route.js`'s `willTransition`/`deactivate`** destroyed a just-saved record because `model.isNew`/`isDeleted` can read stale-`true` right after a successful save (same broken-property family). Fixed with an explicit `_justSaved` flag.
- **Settings page silently never persisted any field change** — `app/models/setting.js`'s `updateSettings` observer watched the native `hasDirtyAttributes`; changing it never fires Ember's classic observer-notification system under `Model.extend()` (reading it doesn't throw, unlike other cases in this family — it just silently never fires). Fixed by watching the real, plain `attr()`-backed properties directly instead (`autoSave`, `showCopy`, `language`, etc.) — those aren't part of the broken synthesized-property family.
- **A render-loop bug in `md-array-table`'s shared array-editing infra** (`app/utils/object-template.js`) — unconditionally replaced every array item with a brand-new object on every `didReceiveAttrs()` firing (which fires on every parent re-render, not once), creating a self-sustaining replace → re-render → replace loop that made it impossible to complete a selection in a nested input. Fixed with an `instanceof templateClass` guard. Affects every array-editing table using this shared component (Online Resource, Responsible Party, Extent, Metadata Contacts, etc.).

---

## Addon Compatibility Matrix (as of this leg)

| Addon | 4.12 version | 5.x status | Notes |
|---|---|---|---|
| ember-source | ~4.12.0 | ~5.8.0 (patched) | Yarn patch for missing `ember-babel` helpers |
| ember-cli | ~4.12.0 | ~5.8.0 | |
| ember-data | ~4.12.0 | ~5.8.0 | Requires hand-built `app/services/store.js` |
| ember-classic-decorator | unpatched | patched | `WeakMap.set()` guard for removed Ember/DS globals |
| ember-cli-flash | ^3.0.0 | ^4.0.0 | Last pre-V2 release |
| ember-local-storage | unpatched | patched | `ember-auto-import` moved to real dependency |
| ember-pouch | ^7.0.0 (patched) | ^7.0.0 (patched, 4 fixes) | `@ember/polyfills` removal, `inverseFor` guard, `hasDirtyAttributes` guard, `onChange` 409 fix |
| ember-cp-validations | unpatched | patched | `DS.ManyArray` instanceof guard |

---

## What's Next

- Open a PR / plan how to land this branch — currently 130+ commits ahead of `develop`, never opened for review. Given how much is now verified end-to-end, worth deciding scope (squash the exploratory history or keep it) and what review it needs.
- `tests/unit/models/setting-test.js`'s `it exists` fails in isolation — pre-existing (confirmed via `git stash` against the untouched original `setting.js`), same unwarmed-store family as bug #7's downstream consequence. Needs the same `store.modelFor('setting')` warm-up pattern already used in the migration script/dev-seed/test-fixture code.
- `Integration | Component | sb publisher` render-crash noticed alongside the above, in the same test run — not investigated, doesn't touch any code this leg changed.
- Autosave (`observeAutoSave`/`hasDirtyHash`) re-verified working end-to-end 2026-09-14; no known gaps.
- Evaluate Embroider readiness and moving further off `@classic` — deferred from the 4.x leg, still applies here.
