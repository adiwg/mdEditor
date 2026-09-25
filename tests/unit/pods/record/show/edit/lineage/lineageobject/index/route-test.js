import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/lineage/lineageobject/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/index');
    assert.ok(route);
  });

  test('setupController reads lineageId from the parent lineageobject controller', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/lineage/lineageobject/index'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = { lineageId: '3' };

    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.lineageId, '3');
  });
});
