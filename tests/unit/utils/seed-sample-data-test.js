import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  createSampleRecord,
  createSampleContact,
  createSampleDictionary,
} from 'mdeditor/tests/helpers/seed-sample-data';

module('Unit | Utility | seed-sample-data', function (hooks) {
  setupTest(hooks);

  test('createSampleRecord creates a real, saved record from the fixture', async function (assert) {
    const store = this.owner.lookup('service:store');
    const record = await createSampleRecord(store, '8o885b9g');

    assert.strictEqual(record.id, '8o885b9g');
    assert.false(record.isNew);
    assert.strictEqual(
      record.json.metadata.resourceInfo.citation.title,
      'FWS AK: Lynx test recordset'
    );
  });

  test('createSampleContact creates a real, saved contact from the fixture', async function (assert) {
    const store = this.owner.lookup('service:store');
    const contact = await createSampleContact(store, 'tvcv9bbi');

    assert.strictEqual(contact.id, 'tvcv9bbi');
    assert.false(contact.isNew);
    assert.strictEqual(contact.json.name, 'Hilmar A. Maier');
  });

  test('createSampleDictionary creates a real, saved dictionary from the fixture', async function (assert) {
    const store = this.owner.lookup('service:store');
    const dictionary = await createSampleDictionary(store, '6rnaen17');

    assert.strictEqual(dictionary.id, '6rnaen17');
    assert.false(dictionary.isNew);
    assert.strictEqual(
      dictionary.json.dataDictionary.citation.title,
      'Telonics CSV file dictionary'
    );
  });

  test('throws a clear error for an unknown id', async function (assert) {
    const store = this.owner.lookup('service:store');

    await assert.rejects(
      createSampleRecord(store, 'not-a-real-id'),
      /No sample records with id "not-a-real-id"/
    );
  });
});
