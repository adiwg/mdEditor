import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/show/edit/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:dictionary/show/edit/index');
    assert.ok(route);
  });

  test('afterModel defaults missing dataDictionary fields', function (assert) {
    const route = this.owner.lookup('route:dictionary/show/edit/index');
    const model = { json: { dataDictionary: {} } };

    route.afterModel(model);

    const dict = model.json.dataDictionary;
    assert.deepEqual(dict.citation, {});
    assert.deepEqual(dict.responsibleParty, {});
    assert.deepEqual(dict.subject, []);
    assert.deepEqual(dict.recommendedUse, []);
    assert.deepEqual(dict.locale, []);
    assert.deepEqual(dict.domain, []);
    assert.deepEqual(dict.entity, []);
  });
});
