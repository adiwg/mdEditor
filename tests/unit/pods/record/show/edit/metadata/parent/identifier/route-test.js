import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | record/show/edit/metadata/parent/identifier',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:record/show/edit/metadata/parent/identifier'
      );
      assert.ok(route);
    });

    test('setupModel resolves identifiers from native arrays', function (assert) {
      let route = this.owner.lookup(
        'route:record/show/edit/metadata/parent/identifier'
      );
      let identifier = { identifier: 'parent-id-0' };

      route.identifierId = '0';
      route.modelFor = function () {
        return {
          get(path) {
            if (
              path === 'json.metadata.metadataInfo.parentMetadata.identifier'
            ) {
              return [identifier];
            }

            return undefined;
          },
        };
      };

      assert.strictEqual(route.setupModel(), identifier);
    });
  }
);
