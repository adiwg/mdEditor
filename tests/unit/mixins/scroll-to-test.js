import Ember from 'ember';
import ScrollToMixin from 'mdeditor/mixins/scroll-to';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll to');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollToObject = Ember.Object.extend(ScrollToMixin);
  let subject = ScrollToObject.create();
  assert.ok(subject);
});
