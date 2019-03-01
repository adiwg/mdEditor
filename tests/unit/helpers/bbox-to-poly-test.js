import { bboxToPoly } from 'mdeditor/helpers/bbox-to-poly';
import { module, test } from 'qunit';

module('Unit | Helper | bbox to poly', function() {
  test('it works', function(assert) {
    let result = bboxToPoly([{
      southLatitude: 1,
      northLatitude: 2,
      westLongitude: 3,
      eastLongitude: 4
    }]);
    assert.equal("[[1,3],[2,3],[2,4],[1,4]]", JSON.stringify(result));
  });
});
