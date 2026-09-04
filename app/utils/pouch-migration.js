import { initDb } from 'mdeditor/adapters/pouch-base';

/**
 * One-time migration for installs upgraded from the pre-collapse app, where
 * `record`/`contact`/`dictionary` lived in `ember-local-storage` (plain
 * browser `localStorage`) and only explicitly-linked records had a second,
 * separate `pouch-record`/`pouch-contact`/`pouch-dictionary` doc in the
 * local Pouch db. Both of those model families are gone now - every record
 * is a Pouch doc directly, flagged with `syncEnabled` instead of having a
 * linked twin. This reads the old storage formats directly (bypassing
 * ember-data entirely, since the adapters that wrote them no longer exist)
 * and recreates each record through the new Pouch-backed models.
 *
 * Safe to call on every boot: it no-ops once the completion flag is set,
 * and skips any record that's already a real Pouch doc if it's interrupted
 * partway through and re-run.
 */

const MIGRATION_FLAG_KEY = 'mdeditor:pouch-migration-complete';

const TYPES = {
  record: { storagePrefix: 'records-', pouchType: 'pouchRecord' },
  contact: { storagePrefix: 'contacts-', pouchType: 'pouchContact' },
  dictionary: { storagePrefix: 'dictionaries-', pouchType: 'pouchDictionary' },
};

// relational-pouch's `.rel` API needs a schema entry before it will
// recognize a type - the old pouch-record/pouch-contact/pouch-dictionary
// adapters registered this as a side effect of `_init()`, but those
// adapters are gone, so it's registered by hand here, scoped to this one
// migration-local PouchDB handle.
const OLD_POUCH_SCHEMA = Object.values(TYPES).map(({ pouchType }) => ({
  singular: pouchType,
  plural: `${pouchType}s`,
}));

// The new-format record/contact/dictionary schema, registered here too so
// `alreadyMigrated` can query it directly through relational-pouch. The
// real per-model adapters register this same schema (singular = camelized
// modelName, see ember-pouch's `getRecordTypeName`) on their own separate
// PouchDB handle - schema is bookkeeping local to whichever JS `db` object
// it's set on, not something persisted, so it has to be repeated here.
const NEW_POUCH_SCHEMA = Object.keys(TYPES).map((type) => ({
  singular: type,
  plural: `${type}s`,
}));

// ember-local-storage's JSONAPI adapter dasherizes attribute keys on write.
// `date-updated` is the only multi-word attribute any of these models has;
// `rev` is deliberately dropped - it was never a meaningful PouchDB
// revision under the old local-storage adapter, and ember-pouch already
// strips a null/stale `rev` before creating a new doc.
function denormalizeAttributes(attributes = {}) {
  let result = {};

  if (attributes.profile !== undefined) {
    result.profile = attributes.profile;
  }
  if (attributes.json !== undefined) {
    result.json = attributes.json;
  }
  if (attributes['date-updated'] !== undefined) {
    result.dateUpdated = new Date(attributes['date-updated']);
  }

  return result;
}

function readLocalStorageRecords(prefix) {
  let results = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key || !key.startsWith(prefix)) {
      continue;
    }

    try {
      const raw = JSON.parse(localStorage.getItem(key));

      results.push({
        id: raw?.id ?? key.slice(prefix.length),
        attributes: denormalizeAttributes(raw?.attributes),
      });
    } catch (e) {
      // Skip a stray/corrupt key rather than failing the whole migration.
      console.warn(`[pouch-migration] Could not parse localStorage key "${key}"`, e); // eslint-disable-line no-console
    }
  }

  return results;
}

async function readSyncedDocs(db, pouchType) {
  try {
    const payload = await db.rel.find(pouchType);
    const key = Object.keys(payload)[0];

    return key ? payload[key] : [];
  } catch (e) {
    // No docs of this type were ever synced under the old scheme.
    return [];
  }
}

// Deliberately bypasses `store.findRecord()`: ember-pouch's adapter treats
// a not-found result as possibly-still-replicating and waits indefinitely
// for the doc to eventually show up (its `eventuallyConsistent` option,
// which this app never disables) rather than rejecting. That's fine for
// normal app usage, which only ever calls `findRecord` for ids it already
// knows exist, but it hangs this migration forever on the first
// not-yet-migrated record. `db.rel.find` gives the same existence check
// `readSyncedDocs` above already relies on, without that wrapper.
async function alreadyMigrated(db, type, id) {
  const payload = await db.rel.find(type, id);
  const key = Object.keys(payload)[0];
  const results = key ? payload[key] : [];

  return results.length > 0;
}

async function migrateType(store, db, type, { storagePrefix, pouchType }) {
  const localRecords = readLocalStorageRecords(storagePrefix);
  const syncedDocs = await readSyncedDocs(db, pouchType);
  const syncedById = new Map(syncedDocs.map((doc) => [String(doc.id), doc]));
  const migratedIds = new Set();

  // Sequential (not .forEach()/Promise.all) so each save is awaited in
  // order; a classic indexed loop also sidesteps a babel-eslint
  // false-positive on destructured for...of bindings (see git history).
  for (let i = 0; i < localRecords.length; i++) {
    const { id, attributes } = localRecords[i];

    if (await alreadyMigrated(db, type, id)) {
      migratedIds.add(String(id));
      continue;
    }

    const record = store.createRecord(type, {
      id,
      ...attributes,
      syncEnabled: syncedById.has(String(id)),
    });

    await record.save();
    migratedIds.add(String(id));
  }

  // Docs that only ever existed on the synced side (pulled from a remote
  // CouchDB but never imported into a real local record) become real
  // records too, instead of silently disappearing.
  const syncedEntries = Array.from(syncedById.entries());

  for (let i = 0; i < syncedEntries.length; i++) {
    const [id, doc] = syncedEntries[i];

    if (migratedIds.has(id) || (await alreadyMigrated(db, type, id))) {
      continue;
    }

    const record = store.createRecord(type, {
      id,
      json: doc.json,
      syncEnabled: true,
    });

    await record.save();
  }
}

export async function runPouchMigration(store) {
  if (localStorage.getItem(MIGRATION_FLAG_KEY)) {
    return;
  }

  const db = initDb();

  db.setSchema([...OLD_POUCH_SCHEMA, ...NEW_POUCH_SCHEMA]);

  const typeEntries = Object.entries(TYPES);

  // `runPouchMigration` runs in `beforeModel`, before anything else has
  // touched the store - so `store.createRecord(type, ...)` below would be
  // the very first ember-data interaction for these types. Warp-drive's
  // schema provider asserts a model has been "looked up via the store"
  // (i.e. `store.modelFor()` called at least once, which tags the class
  // with its modelName) before allowing schema/attribute access, and
  // `createRecord` needs that access immediately to normalize the
  // properties hash - so an unwarmed type throws synchronously. Normal
  // app code never hits this because a list route's `findAll` always
  // warms a type long before a user could create a record of it.
  for (let i = 0; i < typeEntries.length; i++) {
    store.modelFor(typeEntries[i][0]);
  }

  for (let i = 0; i < typeEntries.length; i++) {
    const [type, config] = typeEntries[i];

    await migrateType(store, db, type, config);
  }

  localStorage.setItem(MIGRATION_FLAG_KEY, new Date().toISOString());
}
