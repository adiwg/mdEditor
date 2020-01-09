import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('value', false);
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{input/md-toggle
      value=this.value
      showLabels=true
      onToggle=(action (mut this.value))
      offLabel="No"
      onLabel="Yes"
    }}`);
    assert.equal(find('.x-toggle-component').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Yes|');

    await click('.x-toggle-btn');

    assert.ok(find('.toggle-on'), 'toggle on')
    // Template block usage:
    await render(hbs`
      {{#input/md-toggle class="testme"}}
        template block text
      {{/input/md-toggle}}
    `);

    assert.equal(find('.testme').textContent.trim(), 'template block text');
  });
});
