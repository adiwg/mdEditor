import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/show/edit/domain/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/domain/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing domain array', function (assert) {
    const route = this.owner.lookup('route:dictionary/show/edit/domain/index');
    const model = { json: { dataDictionary: {} } };

    route.afterModel(model);

    assert.deepEqual(model.json.dataDictionary.domain, []);
  });

  test('afterModel leaves an existing domain array untouched', function (assert) {
    const route = this.owner.lookup('route:dictionary/show/edit/domain/index');
    const existing = [{ codeName: 'kept' }];
    const model = { json: { dataDictionary: { domain: existing } } };

    route.afterModel(model);

    assert.strictEqual(model.json.dataDictionary.domain, existing);
  });
});
