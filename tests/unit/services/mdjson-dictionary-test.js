import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | mdjson - Dictionary Export/Import', function (hooks) {
  setupTest(hooks);

  test('formatRecord with includeDictionaries=false should not include dataDictionary array', function (assert) {
    let service = this.owner.lookup('service:mdjson');
    let store = this.owner.lookup('service:store');

    // Create a mock record with mdDictionary array
    let mockRecord = {
      get: function (path) {
        if (path === 'json') {
          return {
            metadata: {
              metadataInfo: {
                metadataIdentifier: {
                  identifier: 'test-123',
                  namespace: 'urn:uuid',
                },
              },
            },
            mdDictionary: ['dict-id-1', 'dict-id-2'],
          };
        }
        if (path === 'json.mdDictionary') {
          return ['dict-id-1', 'dict-id-2'];
        }
        return null;
      },
    };

    // Mock the cleaner service
    service.cleaner = {
      clean: function (obj) {
        return JSON.parse(JSON.stringify(obj));
      },
    };

    // Mock the contacts service
    service.contacts = {
      get: function () {
        return { contacts: [] };
      },
    };

    // Mock store to return empty arrays
    service.store = {
      peekAll: function () {
        return {
          mapBy: function () {
            return [];
          },
        };
      },
    };

    // Test with includeDictionaries = false (mdJSON export)
    let result = service.formatRecord(mockRecord, false, false);

    // The result should not have a dataDictionary array
    assert.notOk(
      result.dataDictionary,
      'mdJSON export should not include dataDictionary array'
    );
    assert.notOk(
      result.mdDictionary,
      'mdJSON export should not include mdDictionary array'
    );

    // Test with includeDictionaries = true (default, mdEditor-JSON export)
    let resultWithDicts = service.formatRecord(mockRecord, false, true);

    // The result should have a dataDictionary array (empty in this case since we mocked empty store)
    assert.ok(
      resultWithDicts.hasOwnProperty('dataDictionary'),
      'mdEditor-JSON export should include dataDictionary array'
    );
  });

  test('formatRecord with default parameters should include dictionaries', function (assert) {
    let service = this.owner.lookup('service:mdjson');

    // Create a mock record
    let mockRecord = {
      get: function (path) {
        if (path === 'json') {
          return {
            metadata: {
              metadataInfo: {
                metadataIdentifier: {
                  identifier: 'test-123',
                  namespace: 'urn:uuid',
                },
              },
            },
          };
        }
        if (path === 'json.mdDictionary') {
          return [];
        }
        return null;
      },
    };

    // Mock the cleaner service
    service.cleaner = {
      clean: function (obj) {
        return JSON.parse(JSON.stringify(obj));
      },
    };

    // Mock the contacts service
    service.contacts = {
      get: function () {
        return { contacts: [] };
      },
    };

    // Mock store to return empty arrays
    service.store = {
      peekAll: function () {
        return {
          mapBy: function () {
            return [];
          },
        };
      },
    };

    // Test with default parameters (should include dictionaries)
    let result = service.formatRecord(mockRecord);

    // The result should have a dataDictionary array (even if empty)
    assert.ok(
      result.hasOwnProperty('dataDictionary'),
      'Default formatRecord should include dataDictionary array'
    );
  });
});
