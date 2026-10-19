import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/main/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/main/index');
    assert.ok(route);
  });

  test('afterModel defaults missing resourceInfo fields', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/main/index');
    const model = { json: { metadata: {} } };

    route.afterModel(model);

    const info = model.json.metadata.resourceInfo;
    assert.ok(info, 'resourceInfo is created when missing');
    assert.deepEqual(info.timePeriod, {});
    assert.deepEqual(info.defaultResourceLocale, {});
    assert.deepEqual(info.pointOfContact, []);
    assert.deepEqual(info.status, []);
    assert.ok(info.citation, 'citation defaults to a formatted citation');
    assert.deepEqual(info.credit, []);
    assert.deepEqual(info.resourceType, []);
    assert.deepEqual(info.resourceMaintenance, []);
    assert.deepEqual(info.graphicOverview, []);
  });

  test('afterModel is a no-op when there is no metadata', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/main/index');

    assert.equal(route.afterModel(null), undefined);
    assert.equal(route.afterModel({ json: {} }), undefined);
  });
});
