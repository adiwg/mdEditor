import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | models-table/row-expand', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{models-table/row-expand}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#models-table/row-expand}}
        template block text
      {{/models-table/row-expand}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
