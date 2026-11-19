import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/funding/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/funding/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing funding array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/funding/index');
    const model = { json: { metadata: {} } };

    route.afterModel(model);

    assert.deepEqual(model.json.metadata.funding.toArray(), []);
  });
});
