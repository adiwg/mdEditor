import { mdObjectSize, storageSize } from 'mdeditor/utils/md-object-size';
import { module, test } from 'qunit';

module('Unit | Utility | md-object-size', function() {

  // Replace this with your real tests.
  test('calculates size of object and percent', function(assert) {
    assert.expect(2)
    let data = {foo: "value1", bar: "value2" }
    let result = mdObjectSize(data);
    assert.equal(result, 0.031, 'calculated size of object');

    assert.ok(storageSize());
  });
});
