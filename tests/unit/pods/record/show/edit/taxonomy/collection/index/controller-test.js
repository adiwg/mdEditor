import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | record/show/edit/taxonomy/collection/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup(
      'controller:record/show/edit/taxonomy/collection/index'
    );
    assert.ok(controller);
  });

  test('addITIS shows the settings modal when no ITIS proxy URL is configured', function (assert) {
    const controller = this.owner.lookup(
      'controller:record/show/edit/taxonomy/collection/index'
    );
    let transitionedTo = '';

    controller.settings = { data: {} };
    controller.router = { transitionTo: (name) => (transitionedTo = name) };

    controller.send('addITIS');

    assert.true(controller.showItisModal);
    assert.strictEqual(transitionedTo, '');
  });

  test('addITIS transitions to the ITIS route when a proxy URL is configured', function (assert) {
    const controller = this.owner.lookup(
      'controller:record/show/edit/taxonomy/collection/index'
    );
    let transitionedTo = '';

    controller.settings = { data: { itisProxyUrl: 'https://itis.example' } };
    controller.router = { transitionTo: (name) => (transitionedTo = name) };

    controller.send('addITIS');

    assert.false(controller.showItisModal);
    assert.strictEqual(
      transitionedTo,
      'record.show.edit.taxonomy.collection.itis'
    );
  });
});
