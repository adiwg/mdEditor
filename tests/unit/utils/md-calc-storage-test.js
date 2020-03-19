import mdObjectSize from 'mdeditor/utils/md-object-size';
import { module, test } from 'qunit';

module('Unit | Utility | md-calcStorage', function() {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let data = {foo: "value1", bar: "value2" }
    let result = mdObjectSize(data);
    assert.equal(result, 0.031, 'calculated data is correct');
  });
});
