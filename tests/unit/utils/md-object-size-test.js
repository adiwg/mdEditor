import  mdObjectSize from 'mdeditor/utils/md-object-size';
import { module, test } from 'qunit';

module('Unit | Utility | md-object-size', function() {


  // Replace this with your real tests.
  test('calculates size of object and percent', function(assert) {
    //set up a before hook that mimics local storage and use it to calculate storage
    assert.ok(mdObjectSize())
  });
});
