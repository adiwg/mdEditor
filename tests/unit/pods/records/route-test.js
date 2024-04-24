import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | records', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    var route = this.owner.lookup('route:records');
    assert.ok(route);
  });
});
