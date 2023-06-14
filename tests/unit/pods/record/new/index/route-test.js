import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/new/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:record/new/index');
    assert.ok(route);
  });
});
