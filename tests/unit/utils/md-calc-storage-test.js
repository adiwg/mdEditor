import mdCalcStorage from 'mdeditor/utils/md-calc-storage';
import { module, test } from 'qunit';

module('Unit | Utility | md-calcStorage', function() {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let data = {foo: "value1", bar: "value2" }
    let result = mdCalcStorage(data);
    assert.equal(result, 0.031, 'calculated data is correct');
  });
});
