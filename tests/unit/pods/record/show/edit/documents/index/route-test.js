import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/documents/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/documents/index');
    assert.ok(route);
  });

  test('afterModel defaults a missing additionalDocumentation array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/documents/index');
    const model = { json: { metadata: {} } };

    route.afterModel(model);

    assert.deepEqual(model.json.metadata.additionalDocumentation, []);
  });
});
