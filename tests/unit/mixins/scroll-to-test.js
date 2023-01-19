import EmberObject from '@ember/object';
import ScrollToMixin from 'mdeditor/mixins/scroll-to';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll to', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let ScrollToObject = EmberObject.extend(ScrollToMixin);
    let subject = ScrollToObject.create();
    assert.ok(subject);
  });
});
