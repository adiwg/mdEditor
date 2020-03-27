import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | localStorageMonitor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    assert.expect(2)

    const localStorageMonitor = this.owner.lookup('service:local-storage-monitor');
    assert.ok(localStorageMonitor.showWarning())
    assert.ok(localStorageMonitor.showDanger())
    //stub the showMessage function to validate showWarning or showDanger function
  });
});
