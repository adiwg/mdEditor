import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | array-required', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:array-required');
    assert.ok(validator);
  });
});
