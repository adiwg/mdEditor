import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/lineage/lineageobject/step/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/index');
    assert.ok(route);
  });

  test('setupController reads stepId from the parent step controller', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/lineage/lineageobject/step/index'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = { stepId: '1' };

    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.stepId, '1');
  });
});
