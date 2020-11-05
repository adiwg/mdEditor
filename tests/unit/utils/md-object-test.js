import mdObject from 'mdeditor/utils/md-object';
import { module, test } from 'qunit';

module('Unit | Utility | md-object', function () {

  // Replace this with your real tests.
  test('it works', function (assert) {
    assert.equal(mdObject.isEmpty({}), true);
    assert.equal(mdObject.isEmpty({ foo: '' }), true);
    assert.equal(mdObject.isEmpty({ foo: [] }), true);
    assert.equal(mdObject.isEmpty({ foo: 'bar' }), false);
    assert.equal(mdObject.isEmpty({ foo: { bar: {} } }), true);
    assert.equal(mdObject.isEmpty({ foo: false }), false);
  });
});
