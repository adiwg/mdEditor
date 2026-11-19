import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Route | record/show/edit/metadata/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/metadata/index');
    assert.ok(route);
  });

  test('afterModel defaults missing metadataInfo fields', async function (assert) {
    const route = this.owner.lookup('route:record/show/edit/metadata/index');
    const model = { json: { metadata: { metadataInfo: {} } } };

    route.afterModel(model);
    await settled();

    const info = model.json.metadata.metadataInfo;
    assert.deepEqual(info.metadataContact, []);
    assert.deepEqual(info.metadataDate, []);
    assert.deepEqual(info.metadataMaintenance, {});
    assert.deepEqual(info.metadataOnlineResource, []);
    assert.deepEqual(info.defaultMetadataLocale, {});
    assert.deepEqual(info.metadataIdentifier, {});
    assert.deepEqual(info.parentMetadata, {});
    assert.deepEqual(info.alternateMetadataReference, []);
    assert.deepEqual(model.json.metadataRepository, []);
  });
});
