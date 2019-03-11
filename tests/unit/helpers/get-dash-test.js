
import { getDash } from 'mdeditor/helpers/get-dash';
import { module, test } from 'qunit';

module('Unit | Helper | get dash', function() {
  test('it works', function(assert) {
    let obj={foo:'bar'};
    let result = getDash([obj, 'foo']);

    assert.equal(result, 'bar', 'value');

    result = getDash([obj, 'biz']);

    assert.equal(result, '--', 'dash');
  });
});
