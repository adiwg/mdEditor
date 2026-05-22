import { find, click, render } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md models table/components/check all', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.data = {
      themeInstance: {
        selectAllRowsIcon: 'select',
        deselectAllRowsIcon: 'deselect'
      },
      selectedItems: EmberObject.create({ length: 0 }),
      length: 1
    };

    this.toggleAllSelection=function(){
        assert.ok(true, 'toggleAll action');

        this.set('selectedItems.length', 1);
    };

    await render(hbs`{{md-models-table/components/check-all data=data selectedItems=data.selectedItems themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}`);

    assert.ok(find('i').classList.contains('deselect'), 'add class');

    await click('button');

    // await render(hbs`{{md-models-table/components/check-all data=data themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}`);

    assert.ok(find('i').classList.contains('select'), 'deselect');

    // Template block usage:
    await render(hbs`
      <MdModelsTable::Components::CheckAll>
        template block text
      </MdModelsTable::Components::CheckAll>
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
