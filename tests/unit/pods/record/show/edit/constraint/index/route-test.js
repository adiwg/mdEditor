import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/constraint/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/constraint/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing constraint array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/constraint/index');
    const model = { json: { metadata: { resourceInfo: {} } } };

    route.afterModel(model);

    assert.deepEqual(model.json.metadata.resourceInfo.constraint, []);
  });
});
