import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layout/md wrap', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{layout/md-wrap class="testme"}}`);

    assert.equal(find('.testme').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#layout/md-wrap class="testme"}}
        template block text
      {{/layout/md-wrap}}
    `);

    assert.equal(find('.testme').textContent.trim(), 'template block text');
  });
});
