/**
 * Seeds the local Pouch db with a small, realistic set of records/
 * contacts/dictionaries (real FWS Alaska test data, trimmed down from
 * `_ak-mdTest-fullset-20231105.json` - see the pouch-couch-collapse spike
 * memory) so a fresh dev environment has something worth looking at
 * without a manual import. Dev-only: gated by the caller checking
 * `config.environment === 'development'` before calling this, and a
 * no-op once the db already has any records (so it never fights with or
 * duplicates real work).
 *
 * The fixture itself lives in `public/dev-fixtures/sample-metadata.json`
 * (fetched at runtime, not bundled) rather than an `app/` module, so this
 * ~55KB of sample data never ships in the production JS bundle.
 */

const FIXTURE_URL = '/dev-fixtures/sample-metadata.json';

export async function seedSampleDataIfEmpty(store) {
  const existing = await store.findAll('record');

  if (existing.length > 0) {
    return;
  }

  // Same reasoning as pouch-migration.js's warm-up loop: this may be the
  // very first ember-data interaction for these types on this store, and
  // `createRecord` needs schema access immediately to normalize its
  // properties hash. See pouch-couch-collapse memory, bug #16.
  ['record', 'contact', 'dictionary'].forEach((type) => store.modelFor(type));

  const response = await fetch(FIXTURE_URL);
  const fixture = await response.json();

  // Contacts and dictionaries first so a record's Point of Contact/
  // Responsible Party fields have something real to resolve against.
  for (const contact of fixture.contacts) {
    const rec = store.createRecord('contact', {
      id: contact.id,
      json: contact.json,
      dateUpdated: new Date(contact.dateUpdated),
    });

    await rec.save();
  }

  for (const dictionary of fixture.dictionaries) {
    const rec = store.createRecord('dictionary', {
      id: dictionary.id,
      profile: dictionary.profile,
      json: dictionary.json,
      dateUpdated: new Date(dictionary.dateUpdated),
    });

    await rec.save();
  }

  for (const record of fixture.records) {
    const rec = store.createRecord('record', {
      id: record.id,
      profile: record.profile,
      json: record.json,
      dateUpdated: new Date(record.dateUpdated),
    });

    await rec.save();
  }
}
