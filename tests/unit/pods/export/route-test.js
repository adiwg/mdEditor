import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | save', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    var route = this.owner.lookup('route:save');
    assert.ok(route);
  });
});
