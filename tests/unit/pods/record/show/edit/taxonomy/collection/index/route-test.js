import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/taxonomy/collection/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/index');
    assert.ok(route);
  });

  test('setupController reads collectionId from the parent collection controller', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/taxonomy/collection/index'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = { collectionId: '4' };

    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.collectionId, '4');
  });
});
