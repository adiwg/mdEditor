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
        'select-row': 'select',
        'deselect-row': 'deselect'
      };

    this.set('isSelected', false);

    await render(hbs`{{md-models-table/components/check isSelected=isSelected themeInstance=themeInstance}}`);

    assert.dom('span').hasClass('deselect', 'add class');

    this.set('isSelected', true);

    assert.dom('span').hasClass('select', 'update class');

    // Template block usage:
    await render(hbs`
      {{#md-models-table/components/check}}
        template block text
      {{/md-models-table/components/check}}
    `);

    assert.dom(this.element).hasText('');
  });
});
