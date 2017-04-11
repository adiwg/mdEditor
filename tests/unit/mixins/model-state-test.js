import Ember from 'ember';
import ModelStateMixin from 'mdeditor/mixins/model-state';
import { module, test } from 'qunit';

module('Unit | Mixin | model state');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModelStateObject = Ember.Object.extend(ModelStateMixin);
  let subject = ModelStateObject.create();
  assert.ok(subject);
});
