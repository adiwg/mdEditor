import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/metadata/parent/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
    assert.ok(route);
  });
});
