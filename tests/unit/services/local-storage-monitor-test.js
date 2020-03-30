import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | localStorageMonitor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {

    const localStorageMonitor = this.owner.lookup('service:local-storage-monitor');

    assert.ok(localStorageMonitor)
  });
});
