import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | json', function (hooks) {
  setupTest(hooks);

  test('it deserialized', function (assert) {
    let transform = this.owner.lookup('transform:json');
    let obj = transform.deserialize('{"foo":"bar"}');

    assert.equal(obj.get('foo'), 'bar');
    assert.equal(Object.keys(obj)[0], 'foo');
    assert.equal(Object.keys(obj).length, 1);
  });

  test('it serialized', function (assert) {
    let transform = this.owner.lookup('transform:json');
    assert.equal(
      transform.serialize({
        foo: 'bar',
      }),
      '{"foo":"bar"}'
    );
  });
});
