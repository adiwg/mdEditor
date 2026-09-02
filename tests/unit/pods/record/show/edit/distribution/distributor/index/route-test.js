import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/distribution/distributor/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/distribution/distributor/index');
    assert.ok(route);
  });

  test('setupController reads distributionId/distributorId from the parent distributor controller', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/distribution/distributor/index'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = { distributionId: '2', distributorId: '5' };

    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.distributionId, '2');
    assert.strictEqual(controller.distributorId, '5');
  });
});
