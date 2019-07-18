import EmberObject from '@ember/object';
import CancelMixin from 'mdeditor/mixins/cancel';
import { module, test } from 'qunit';

module('Unit | Mixin | cancel', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CancelObject = EmberObject.extend(CancelMixin);
    let subject = CancelObject.create();
    assert.ok(subject);
  });
});
