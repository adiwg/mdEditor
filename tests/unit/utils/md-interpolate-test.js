import { interpolate, parseArgs} from 'mdeditor/utils/md-interpolate';
import { module, test } from 'qunit';

module('Unit | Utility | md-interpolate', function() {

  // Replace this with your real tests.
  test('it works', function(assert) {
    assert.expect(2)
    let note = "The attribute <em>this attribute</em> has an associated domain: <strong>this domain</strong>."
    let result = interpolate(note);
    assert.ok(result);

    let note2 = "The attribute <em>${value1}</em> has an associated domain: <strong>${value2}</strong>."
    let result2 = parseArgs(note2)
    assert.ok(result2)
  });
});
