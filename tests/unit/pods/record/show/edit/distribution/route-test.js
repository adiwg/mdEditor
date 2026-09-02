import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/edit/distribution', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:record/show/edit/distribution');
    assert.ok(route);
  });

  test('afterModel wraps a missing resourceDistribution in an Ember array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/distribution');
    const model = { json: { metadata: {} } };

    route.afterModel(model);

    assert.ok(
      typeof model.json.metadata.resourceDistribution.pushObject ===
        'function',
      'resourceDistribution is an Ember array'
    );
    assert.deepEqual(model.json.metadata.resourceDistribution.toArray(), []);
  });

  test('afterModel wraps a plain resourceDistribution array in an Ember array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/distribution');
    const model = {
      json: { metadata: { resourceDistribution: [{ id: 1 }] } },
    };

    route.afterModel(model);

    assert.ok(
      typeof model.json.metadata.resourceDistribution.pushObject ===
        'function',
      'resourceDistribution is converted to an Ember array'
    );
    assert.deepEqual(model.json.metadata.resourceDistribution.toArray(), [
      { id: 1 },
    ]);
  });
});
