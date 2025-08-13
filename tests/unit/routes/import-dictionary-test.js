import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | import - mdJSON Dictionary Handling', function (hooks) {
  setupTest(hooks);

  test('formatMdJSON should populate mdDictionary array from dataDictionary', function (assert) {
    let route = this.owner.lookup('route:import');

    // Mock mdJSON with dataDictionary array
    let mockMdJSON = {
      metadata: {
        metadataInfo: {
          metadataIdentifier: {
            identifier: 'test-123',
            namespace: 'urn:uuid',
          },
        },
      },
      contact: [],
      dataDictionary: [
        {
          dictionaryId: 'dict-id-1',
          citation: { title: 'Dictionary 1' },
        },
        {
          dictionaryId: 'dict-id-2',
          citation: { title: 'Dictionary 2' },
        },
      ],
    };

    let result = route.formatMdJSON(mockMdJSON);

    // Find the record item
    let recordItem = result.findBy('type', 'records');
    assert.ok(recordItem, 'Should create a record item');

    // Parse the JSON to check if mdDictionary was populated
    let recordJson = JSON.parse(recordItem.attributes.json);
    assert.ok(recordJson.mdDictionary, 'Record should have mdDictionary array');
    assert.equal(
      recordJson.mdDictionary.length,
      2,
      'mdDictionary should have 2 entries'
    );
    assert.ok(
      recordJson.mdDictionary.includes('dict-id-1'),
      'Should include dict-id-1'
    );
    assert.ok(
      recordJson.mdDictionary.includes('dict-id-2'),
      'Should include dict-id-2'
    );

    // Check that dictionary items were created
    let dictItems = result.filterBy('type', 'dictionaries');
    assert.equal(dictItems.length, 2, 'Should create 2 dictionary items');
  });

  test('formatMdJSON should remove mdDictionary array from imported mdJSON', function (assert) {
    let route = this.owner.lookup('route:import');

    // Mock mdJSON with invalid mdDictionary array (shouldn't be there per schema)
    let mockMdJSON = {
      metadata: {
        metadataInfo: {
          metadataIdentifier: {
            identifier: 'test-123',
            namespace: 'urn:uuid',
          },
        },
      },
      contact: [],
      mdDictionary: ['should-be-removed'], // This shouldn't be in mdJSON per schema
      dataDictionary: [],
    };

    let result = route.formatMdJSON(mockMdJSON);

    // The original mdJSON object should have mdDictionary removed
    assert.notOk(
      mockMdJSON.mdDictionary,
      'mdDictionary should be removed from imported mdJSON'
    );

    // Find the record item
    let recordItem = result.findBy('type', 'records');
    let recordJson = JSON.parse(recordItem.attributes.json);

    // The record should not have the invalid mdDictionary from import
    assert.notOk(
      recordJson.mdDictionary,
      'Record should not inherit invalid mdDictionary from import'
    );
  });

  test('formatMdJSON should handle dataDictionary without dictionaryId', function (assert) {
    let route = this.owner.lookup('route:import');

    // Mock mdJSON with dataDictionary entries that don't have dictionaryId
    let mockMdJSON = {
      metadata: {
        metadataInfo: {
          metadataIdentifier: {
            identifier: 'test-123',
            namespace: 'urn:uuid',
          },
        },
      },
      contact: [],
      dataDictionary: [
        {
          citation: { title: 'Dictionary without ID' },
          // Missing dictionaryId
        },
        {
          dictionaryId: 'dict-id-1',
          citation: { title: 'Dictionary with ID' },
        },
      ],
    };

    let result = route.formatMdJSON(mockMdJSON);

    // Find the record item
    let recordItem = result.findBy('type', 'records');
    let recordJson = JSON.parse(recordItem.attributes.json);

    // mdDictionary should only include entries with dictionaryId
    assert.ok(recordJson.mdDictionary, 'Record should have mdDictionary array');
    assert.equal(
      recordJson.mdDictionary.length,
      1,
      'mdDictionary should have 1 entry (only the one with ID)'
    );
    assert.ok(
      recordJson.mdDictionary.includes('dict-id-1'),
      'Should include dict-id-1'
    );
  });
});
