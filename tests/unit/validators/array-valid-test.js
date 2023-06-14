import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | array-valid', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    var validator = this.owner.lookup('validator:array-valid');
    assert.ok(validator);
  });
});
