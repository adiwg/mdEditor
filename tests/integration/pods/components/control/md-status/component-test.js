import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md status', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('model',{
      hasDirtyHash: true,
      hasSchemaErrors: false
    })
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-status model=model}}`);
    assert.dom('.md-status-icon .md-error').isVisible();

    this.set('model.hasDirtyHash', false);
    this.set('model.hasSchemaErrors', true);

    assert.dom('.md-status-icon .md-error').isNotVisible();
    // Template block usage:
    await render(hbs`
      {{#control/md-status model=model}}
        template block text
      {{/control/md-status}}
    `);

    assert.dom('.md-status-icon .md-warning').isVisible();
  });
});
