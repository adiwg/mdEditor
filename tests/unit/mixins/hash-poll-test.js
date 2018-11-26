import EmberObject from '@ember/object';
import HashPollMixin from 'mdeditor/mixins/hash-poll';
import { module, test } from 'qunit';

module('Unit | Mixin | hash poll');

// Replace this with your real tests.
test('it works', function(assert) {
  let HashPollObject = EmberObject.extend(HashPollMixin);
  let subject = HashPollObject.create();
  assert.ok(subject);
});
