const PLURALS = {
  record: 'records',
  contact: 'contacts',
  dictionary: 'dictionaries',
};

/**
 * Reads a record/contact/dictionary's raw persisted document directly from
 * the local PouchDB, bypassing ember-data's in-memory model entirely.
 * Needed because a model's two-way-bound fields (e.g. a title alias)
 * reflect a live edit immediately regardless of whether a save has
 * actually landed in Pouch - see e2e/record/persistence.spec.js and
 * e2e/record/autosave.spec.js for cases where that in-memory read was a
 * false-positive persistence check.
 *
 * Uses relational-pouch's db.rel API directly (the same thing ember-pouch's
 * adapter findRecord() calls under the hood, see
 * node_modules/ember-pouch/addon/adapters/pouch.js's _findRecord) - a plain
 * `adapter.db.get(id)` 404s ("missing") because relational-pouch prefixes
 * real PouchDB doc ids with the model type, e.g. `record_<id>`.
 *
 * The `json` field is stored as a JSON *string* (see app/transforms/json.js
 * - serialize() JSON.stringify()s it, deserialize() parses it back), so
 * this parses it before returning.
 */
async function readRawJson(page, type, id) {
  return page.evaluate(
    async ({ type, id, plural }) => {
      // Must go through store.adapterFor(), not a raw container lookup -
      // ember-pouch's adapter only wires up db.rel inside its own _init(),
      // which runs the first time ember-data itself resolves the adapter
      // via adapterFor(); a separately-looked-up instance's db.rel is
      // undefined until that happens.
      const store = window.Mdeditor.__container__.lookup('service:store');
      const adapter = store.adapterFor(type);
      const result = await adapter.db.rel.find(type, id);
      const raw = result?.[type]?.[0] || result?.[plural]?.[0];

      if (!raw || typeof raw.json !== 'string') {
        return null;
      }

      try {
        return JSON.parse(raw.json);
      } catch (e) {
        return null;
      }
    },
    { type, id, plural: PLURALS[type] }
  );
}

module.exports = { readRawJson };
