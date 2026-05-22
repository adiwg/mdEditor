import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md models table/components/check', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.themeInstance = {
        selectRowIcon: 'select',
        deselectRowIcon: 'deselect'
      };

    this.set('isSelected', false);

    await render(hbs`{{md-models-table/components/check isSelected=isSelected themeInstance=themeInstance}}`);

    assert.ok(find('i').classList.contains('deselect'), 'add class');

    this.set('isSelected', true);

    assert.ok(find('i').classList.contains('select'), 'update class');

    // Template block usage:
    await render(hbs`
      <MdModelsTable::Components::Check>
        template block text
      </MdModelsTable::Components::Check>
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
