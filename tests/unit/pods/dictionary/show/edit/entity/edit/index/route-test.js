import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/show/edit/entity/edit/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/index');
    assert.ok(route);
  });

  test('setupController reads entityId from the parent entity controller', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/edit/index'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = {
      entityId: '9',
      setupModel: function () {},
      get(key) { return this[key]; },
      setProperties(props) { Object.assign(this, props); },
    };

    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.entityId, '9');
    assert.strictEqual(parentController.onCancel, parentController.setupModel);
    assert.strictEqual(parentController.cancelScope, route);
  });
});
