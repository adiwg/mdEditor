import Ember from 'ember';
import ModelHashMixin from 'mdeditor/mixins/model-hash';
import { module, test } from 'qunit';

module('Unit | Mixin | model hash');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModelHashObject = Ember.Object.extend(ModelHashMixin);
  let subject = ModelHashObject.create();
  assert.ok(subject);
});
