import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/taxonomy/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/taxonomy/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing taxonomy array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/taxonomy/index');
    const model = { json: { metadata: { resourceInfo: {} } } };

    route.afterModel(model);

    assert.deepEqual(model.json.metadata.resourceInfo.taxonomy, []);
  });
});
