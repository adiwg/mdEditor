import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/edit/associated', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    var route = this.owner.lookup('route:record/show/edit/associated');
    assert.ok(route);
  });
});
