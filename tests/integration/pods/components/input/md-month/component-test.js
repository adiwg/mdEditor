import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md month', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{input/md-month date="10"}}`);

    assert.equal(find('input').value, 'October');

    // Template block usage:
    await render(hbs`
      {{#input/md-month class="testme" date="10"}}
        template block text
      {{/input/md-month}}
    `);

    assert.equal(find('.testme').textContent.trim(), '', 'no block');
  });
});
