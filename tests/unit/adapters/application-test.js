import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    var adapter = this.owner.lookup('adapter:application');
    assert.ok(adapter);
  });

  test('it has a importData method', function(assert) {
    var adapter = this.owner.lookup('adapter:application');
    assert.ok(typeof adapter.importData === 'function');
  });

  test('it has a exportData method', function(assert) {
    var adapter = this.owner.lookup('adapter:application');
    assert.ok(typeof adapter.exportData === 'function');
  });
});
