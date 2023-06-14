import EmberObject from '@ember/object';
import ObjectTemplateMixin from 'mdeditor/mixins/object-template';
import { module, test } from 'qunit';

module('Unit | Mixin | object template', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ObjectTemplateObject = EmberObject.extend(ObjectTemplateMixin);
    let subject = ObjectTemplateObject.create();
    assert.ok(subject);
  });
});
