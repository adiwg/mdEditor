import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | storageMonitor', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    assert.expect(2)

    const storageMonitor = this.owner.lookup('service:storage-monitor');

    this.set('currStorage', {
      "data": [{
        "id": "8ke11eu1",
        "attributes": {
          "profile": "full",
          "json": "{}",
          "date-updated": "2016-09-16T22:08:04.425Z"
        },
        "type": "records",
        "meta": {
          "title": "ytr",
          "export": true
        }
      }, {
        "id": "spt9cadc",
        "attributes": {
          "json": "{}",
          "date-updated": "2016-09-16T22:08:11.080Z"
        },
        "type": "contacts",
        "meta": {
          "title": "ewrrrrrrrrrrrrrr",
          "export": true
        }
      }]
    })
    assert.equal(storageMonitor.calcStorage, 0.607, 'it calculates correctly');
    assert.ok(storageMonitor.storageMessages)
  });
});
