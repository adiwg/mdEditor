import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/show/edit/domain/edit/citation/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing domainReference to an empty object', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/domain/edit/citation/index'
    );
    const model = {};

    route.paramsFor = () => ({ domain_id: '3' });

    route.afterModel(model);

    assert.deepEqual(model.domainReference, {});
    assert.strictEqual(route.domainId, '3');
  });
});
