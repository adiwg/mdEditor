import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/show/edit/entity/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/entity/index');
    assert.ok(route);
  });
});
