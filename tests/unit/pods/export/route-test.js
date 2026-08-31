import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | export', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:export');
    assert.ok(route);
  });

  test('model exposes the settings data alongside the application model', function (assert) {
    const route = this.owner.lookup('route:export');
    const records = [{ id: 1 }];
    const settingsData = { autoSave: true };

    route.modelFor = () => records;
    route.settings = { data: settingsData };

    const model = route.model();

    assert.strictEqual(model.records, records);
    assert.strictEqual(model.settings, settingsData);
  });
});
