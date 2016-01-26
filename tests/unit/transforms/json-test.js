import {
  moduleFor, test
}
from 'ember-qunit';

moduleFor('transform:json', 'Unit | Transform | json', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it deserialized', function (assert) {
  let transform = this.subject();
  assert.deepEqual(transform.deserialize('{"foo":"bar"}'), {
    foo: "bar"
  });
});

test('it serialized', function (assert) {
  let transform = this.subject();
  assert.equal(transform.serialize({
    foo: 'bar'
  }), '{"foo":"bar"}');
});
