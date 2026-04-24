import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | record/show/edit/metadata/alternate/identifier',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:record/show/edit/metadata/alternate/identifier'
      );
      assert.ok(route);
    });

    test('setupModel resolves identifiers from native arrays', function (assert) {
      let route = this.owner.lookup(
        'route:record/show/edit/metadata/alternate/identifier'
      );
      let identifier = { identifier: 'alternate-id-0' };

      route.identifierId = '0';
      route.modelFor = function () {
        return {
          identifier: [identifier],
        };
      };

      assert.strictEqual(route.setupModel(), identifier);
    });
  }
);
