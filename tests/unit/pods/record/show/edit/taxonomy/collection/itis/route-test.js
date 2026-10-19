import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/taxonomy/collection/itis', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/itis');
    assert.ok(route);
  });

  test('setupController reads collectionId from the parent collection controller', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/taxonomy/collection/itis'
    );
    const controller = { set(key, value) { this[key] = value; } };
    const parentController = { collectionId: '2' };

    route.modelFor = () => ({});
    route.controllerFor = () => parentController;
    route.controller = controller;

    route.setupController(controller, {});

    assert.strictEqual(controller.collectionId, '2');
  });
});
