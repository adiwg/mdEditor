import Ember from 'ember';
import ObjectTemplateMixin from 'mdeditor/mixins/object-template';
import { module, test } from 'qunit';

module('Unit | Mixin | object template');

// Replace this with your real tests.
test('it works', function(assert) {
  let ObjectTemplateObject = Ember.Object.extend(ObjectTemplateMixin);
  let subject = ObjectTemplateObject.create();
  assert.ok(subject);
});
