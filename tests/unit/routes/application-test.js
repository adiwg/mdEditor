import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  test('hasUnsavedChanges is true when any model group has a dirty record', function (assert) {
    const route = this.owner.lookup('route:application');

    route.currentRouteModel = () => [
      [{ hasDirtyHash: false }, { hasDirtyHash: true }],
      [{ hasDirtyHash: false }],
    ];

    assert.true(route.hasUnsavedChanges());
  });

  test('hasUnsavedChanges is false when no model group has a dirty record', function (assert) {
    const route = this.owner.lookup('route:application');

    route.currentRouteModel = () => [
      [{ hasDirtyHash: false }],
      [{ hasDirtyHash: false }],
    ];

    assert.false(route.hasUnsavedChanges());
  });

  test('hasUnsavedChanges is false when every model group is empty', function (assert) {
    const route = this.owner.lookup('route:application');

    route.currentRouteModel = () => [[], [], []];

    assert.false(route.hasUnsavedChanges());
  });
});
