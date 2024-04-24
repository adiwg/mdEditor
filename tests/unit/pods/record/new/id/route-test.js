import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/new/id', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:record/new/id');
    assert.ok(route);
  });
});
