import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:dictionary/show/edit');
    assert.ok(route);
  });
});
