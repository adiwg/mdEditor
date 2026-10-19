import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/metadata/parent/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
    assert.ok(route);
  });

  test('afterModel does not crash and redirects when metadataInfo is missing entirely', function (assert) {
    let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
    let warned = null;
    let redirectedTo = null;

    route.flashMessages = { warning: (msg) => (warned = msg) };
    route.router = { replaceWith: (routeName) => (redirectedTo = routeName) };

    // json.metadata has no metadataInfo key at all - the multi-level path
    // `json.metadata.metadataInfo.parentMetadata` this method reads must not
    // throw when an intermediate segment is simply absent.
    let model = { json: { metadata: {} } };

    route.afterModel(model);

    assert.strictEqual(warned, 'No Parent Citation found! Re-directing to Metadata...');
    assert.strictEqual(redirectedTo, 'record.show.edit.metadata');
  });

  test('afterModel does not redirect when parentMetadata is present', function (assert) {
    let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
    let warned = null;

    route.flashMessages = { warning: (msg) => (warned = msg) };
    route.router = { replaceWith: () => assert.notOk(true, 'should not redirect') };

    let model = {
      json: {
        metadata: { metadataInfo: { parentMetadata: { title: 'Parent' } } },
      },
    };

    route.afterModel(model);

    assert.strictEqual(warned, null);
  });
});
