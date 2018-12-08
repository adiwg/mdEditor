import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | json', function(hooks) {
  setupTest(hooks);

  test('it deserialized', function (assert) {
    let transform = this.owner.lookup('transform:json');
    assert.deepEqual(transform.deserialize('{"foo":"bar"}'), {
      foo: "bar"
    });
  });

  test('it serialized', function (assert) {
    let transform = this.owner.lookup('transform:json');
    assert.equal(transform.serialize({
      foo: 'bar'
    }), '{"foo":"bar"}');
  });
});
