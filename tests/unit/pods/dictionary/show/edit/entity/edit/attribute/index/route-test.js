import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/show/edit/entity/edit/attribute/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute/index');
    assert.ok(route);
  });

  test('setupController wires the parent attribute controller onCancel through to the dictionary controller', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/edit/attribute/index'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = {
      setupModel: function () {},
      setProperties(props) { Object.assign(this, props); },
    };

    route.entityId = '2';
    route.attributeId = '5';
    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.entityId, '2');
    assert.strictEqual(controller.attributeId, '5');
    assert.strictEqual(parentController.onCancel, parentController.setupModel);
    assert.strictEqual(parentController.cancelScope, route);
  });
});
