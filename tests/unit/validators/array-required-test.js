import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:array-required', 'Unit | Validator | array-required', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
