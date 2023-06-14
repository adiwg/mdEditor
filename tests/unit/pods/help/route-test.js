import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | help', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    var route = this.owner.lookup('route:help');
    assert.ok(route);
  });
});
