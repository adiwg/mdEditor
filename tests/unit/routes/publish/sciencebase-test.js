import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | publish/sciencebase', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:publish/sciencebase');
    assert.ok(route);
  });
});
