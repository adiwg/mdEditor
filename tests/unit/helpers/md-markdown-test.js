import { mdMarkdown } from 'mdeditor/helpers/md-markdown';
import { module, test } from 'qunit';

module('Unit | Helper | md markdown', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let result = mdMarkdown('# Test');
    assert.equal(result.string.trim(), '<p>#</p>');
  });
});
