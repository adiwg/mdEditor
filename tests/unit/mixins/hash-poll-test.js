import Ember from 'ember';
import HashPollMixin from 'mdeditor/mixins/hash-poll';
import { module, test } from 'qunit';

module('Unit | Mixin | hash poll');

// Replace this with your real tests.
test('it works', function(assert) {
  let HashPollObject = Ember.Object.extend(HashPollMixin);
  let subject = HashPollObject.create();
  assert.ok(subject);
});
