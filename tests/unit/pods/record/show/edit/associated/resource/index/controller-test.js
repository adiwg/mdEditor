import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Controller | record/show/edit/associated/resource/index',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      const controller = this.owner.lookup(
        'controller:record/show/edit/associated/resource/index'
      );
      assert.ok(controller);
    });

    test('sliderData returns only records with a recordId', function (assert) {
      const controller = this.owner.lookup(
        'controller:record/show/edit/associated/resource/index'
      );

      controller.store = {
        peekAll: () => [
          { id: 'a', recordId: 'rec-1' },
          { id: 'b', recordId: null },
        ],
      };

      const result = controller.sliderData();

      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].id, 'a');
    });
  }
);
