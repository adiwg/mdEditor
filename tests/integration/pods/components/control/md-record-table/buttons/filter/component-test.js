import { find, render, doubleClick } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md record table/buttons/filter', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    var items = ['foo', 'bar'];
    // Set any properties with this.set('myProperty', 'value');
    this.set('selectedItems', items);
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('deleteSelected', function(selectedItems) {
      assert.equal(selectedItems, items, 'fires action')
    });

    await render(hbs`{{control/md-record-table/buttons/filter deleteSelected=deleteSelected selectedItems=selectedItems}}`);

    assert.equal(find('button.btn-danger').textContent.trim(), 'Delete Selected');

    doubleClick('button.btn-danger');
  });
});
