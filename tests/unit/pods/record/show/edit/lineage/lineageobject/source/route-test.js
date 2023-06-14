import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | record/show/edit/lineage/lineageobject/source',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:record/show/edit/lineage/lineageobject/source'
      );
      assert.ok(route);
    });
  }
);
