import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | translate', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:translate');
    assert.ok(route);
  });
});
