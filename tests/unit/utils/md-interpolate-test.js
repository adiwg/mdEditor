import { interpolate, parseArgs } from 'mdeditor/utils/md-interpolate';
import { module, test } from 'qunit';

module('Unit | Utility | md-interpolate', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    assert.expect(2);
    let note =
      'The attribute <em>${value1}</em> has an associated domain: <strong>${value2}</strong>.';

    let result = interpolate(note, { value1: 'foo', value2: 'bar' });
    assert.equal(
      result,
      'The attribute <em>foo</em> has an associated domain: <strong>bar</strong>.'
    );

    let result2 = parseArgs(note);
    assert.deepEqual(result2, ['value1', 'value2']);
  });
});
