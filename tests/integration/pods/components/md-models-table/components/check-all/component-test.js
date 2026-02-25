import { find, click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md models table/components/check all', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    this.data = {
      themeInstance: {
        selectAllRowsIcon: 'select',
        deselectAllRowsIcon: 'deselect'
      },
      selectedItems: {
        length: 0
      },
      length: 1
    };

    this.toggleAllSelection = function() {
      assert.ok(true, 'toggleAll action');

      this.set('selectedItems.length', 1);
    };

    await render(hbs`{{md-models-table/components/check-all data=this.data selectedItems=this.data.selectedItems themeInstance=this.data.themeInstance toggleAllSelection=this.toggleAllSelection}}`);

    assert.ok(find('span').classList.contains('deselect'), 'add class');

    await click('span');

    assert.ok(find('span').classList.contains('select'), 'deselect');

    // Template block usage:
    await render(hbs`
      {{#md-models-table/components/check-all}}
        template block text
      {{/md-models-table/components/check-all}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
