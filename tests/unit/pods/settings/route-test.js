import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Route | settings', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:settings');
    assert.ok(route);
  });

  test('getPublishOptions returns a valid default synchronously without mutating the model mid-render', async function (assert) {
    let route = this.owner.lookup('route:settings');
    let model = { get: () => undefined, set() {} };
    let setCalls = 0;

    model.set = (key, value) => {
      setCalls++;
      model[key] = value;
    };
    model.get = (key) => model[key];

    route.modelFor = () => model;

    // Called directly (not wrapped in a runloop) so any synchronous
    // mutation would show up on `setCalls` immediately, before the
    // deferred `schedule('afterRender', ...)` work has a chance to run.
    let result = route.actions.getPublishOptions.call(route, 'CouchDB');

    // getPublishOptions must not mutate the model as part of its own call
    // stack -- doing so while it's invoked from a template during render
    // was the cause of the intermittent "must supply both model and
    // valuePath" crash in couchdb-settings.
    assert.strictEqual(setCalls, 0, 'model is not mutated synchronously');
    assert.ok(result, 'a default entry is returned for immediate rendering');
    assert.strictEqual(result.publisher, 'CouchDB');
    assert.strictEqual(result.publisherEndpoint, '');

    await settled();

    assert.ok(
      Array.isArray(model.publishOptions),
      'publishOptions is persisted onto the model after the render settles'
    );
    assert.strictEqual(model.publishOptions.length, 1);
    assert.strictEqual(model.publishOptions[0].publisher, 'CouchDB');
  });
});
