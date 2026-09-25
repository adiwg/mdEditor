import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Route | dictionary/show/edit/entity/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/entity/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing entity array', async function (assert) {
    const route = this.owner.lookup('route:dictionary/show/edit/entity/index');
    const model = { json: { dataDictionary: {} } };

    route.afterModel(model);
    await settled();

    assert.deepEqual(model.json.dataDictionary.entity, []);
  });
});
