import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | dictionary/show/edit/domain/edit/citation/identifier',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:dictionary/show/edit/domain/edit/citation/identifier'
      );
      assert.ok(route);
    });
  }
);
