import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:array-valid', 'Unit | Validator | array-valid', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
