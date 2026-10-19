/**
 * Opt-in access to the same curated real-world fixture data the dev
 * environment auto-seeds with (see app/utils/dev-seed-data.js and
 * public/dev-fixtures/sample-metadata.json). Most tests should keep using
 * minimal synthetic data (e.g. create-contact.js's createContact()) -
 * reach for this only when a test specifically wants real-shaped
 * complexity (deep nesting, a realistic citation/extent, multiple
 * cross-referenced contacts) rather than hand-building it inline.
 *
 * Unlike the dev seeder, nothing here runs automatically - each helper
 * creates exactly the one record/contact/dictionary asked for, by id.
 */

const FIXTURE_URL = '/dev-fixtures/sample-metadata.json';

/**
 * What's actually in the fixture, for discoverability without opening the
 * (minified) JSON file directly.
 */
export const SAMPLE_IDS = {
  records: {
    '8o885b9g': 'FWS AK: Lynx test recordset',
    '4t1eedh0':
      'Movement Patterns, Dispersal Behavior, and Survival of Lynx...',
    ic6901c9: 'lynx_capture_database_tpl_20190416.accdb',
    ipn4pfem: 'Study Sites',
    ko7lnmod: 'Alaska Profile Definitions',
  },
  contacts: {
    ljdsk6md: 'Knut Kielland',
    tvcv9bbi: 'Hilmar A. Maier',
    '2nqqafng': 'Jared Laufenberg',
    '6ej9919g': 'McCrea Cobb',
    h9pst2sv:
      'Alaska Region Division of Natural Resources, Inventory and Monitoring Branch (organization)',
    fkpbc9ea: 'Nathan Berg',
  },
  dictionaries: {
    '6rnaen17': 'Telonics CSV file dictionary',
  },
};

let cachedFixture = null;

async function loadSampleFixture() {
  if (!cachedFixture) {
    const response = await fetch(FIXTURE_URL);
    cachedFixture = await response.json();
  }

  return cachedFixture;
}

async function findFixtureItem(collection, id) {
  const fixture = await loadSampleFixture();
  const item = fixture[collection].find((entry) => entry.id === id);

  if (!item) {
    throw new Error(
      `No sample ${collection} with id "${id}" in ${FIXTURE_URL}`
    );
  }

  return item;
}

// A fresh setupTest() container's store has never touched these types -
// createRecord needs schema access immediately to normalize its properties
// hash, which warp-drive disallows until the type has been "looked up via
// the store" at least once. Same fix as pouch-migration.js/dev-seed-data.js
// (see pouch-couch-collapse memory, bug #16); cheap and idempotent, so it's
// called unconditionally rather than tracked per-type.
function warm(store, type) {
  store.modelFor(type);
}

export async function createSampleRecord(store, id) {
  const data = await findFixtureItem('records', id);

  warm(store, 'record');
  const record = store.createRecord('record', {
    id: data.id,
    profile: data.profile,
    json: data.json,
    dateUpdated: new Date(data.dateUpdated),
  });

  await record.save();

  return record;
}

export async function createSampleContact(store, id) {
  const data = await findFixtureItem('contacts', id);

  warm(store, 'contact');
  const contact = store.createRecord('contact', {
    id: data.id,
    json: data.json,
    dateUpdated: new Date(data.dateUpdated),
  });

  await contact.save();

  return contact;
}

export async function createSampleDictionary(store, id) {
  const data = await findFixtureItem('dictionaries', id);

  warm(store, 'dictionary');
  const dictionary = store.createRecord('dictionary', {
    id: data.id,
    profile: data.profile,
    json: data.json,
    dateUpdated: new Date(data.dateUpdated),
  });

  await dictionary.save();

  return dictionary;
}
