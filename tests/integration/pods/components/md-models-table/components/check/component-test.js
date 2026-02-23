import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md models table/components/check', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.themeInstance = {
      selectRowIcon: 'select',
      deselectRowIcon: 'deselect'
    };

    this.set('isSelected', false);

    await render(hbs`{{md-models-table/components/check isSelected=this.isSelected themeInstance=this.themeInstance}}`);

    assert.ok(find('span').classList.contains('deselect'), 'add class');

    this.set('isSelected', true);

    assert.ok(find('span').classList.contains('select'), 'update class');

    // Template block usage:
    await render(hbs`
      {{#md-models-table/components/check}}
        template block text
      {{/md-models-table/components/check}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
