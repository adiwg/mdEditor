import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/edit/documents', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:record/show/edit/documents');
    assert.ok(route);
  });
});
