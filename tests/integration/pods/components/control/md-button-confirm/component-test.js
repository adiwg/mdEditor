import { click, find, render, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md button confirm', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs`{{control/md-button-confirm}}`);

    assert.equal(find('button').innerText.trim(), '');

    // Template block usage:" + EOL +
    await render(hbs`
      {{#control/md-button-confirm}}
        template block text
      {{/control/md-button-confirm}}
    `);

    assert.equal(find('button').innerText.trim(), 'template block text');
  });

  test('shows and cancels confirm', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // Template block usage:" + EOL +
    await render(hbs`
      <a href="#">Test</a>
      {{#control/md-button-confirm}}
        Test
      {{/control/md-button-confirm}}
    `);

    assert.equal(find('button').innerText.trim(), 'Test', 'renders button');

    await click('button');

    assert.equal(find('button').innerText.trim(), 'Confirm', 'renders confirm');

    await triggerEvent('button', 'blur');
    assert.equal(find('button').innerText.trim(), 'Test', 'cancels confirm');
  });

  test('performs confirm action', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('externalAction', (type) => {
      assert.ok(type, `${type} called`);
    });

    // Template block usage:" + EOL +
    await render(hbs`
      {{#control/md-button-confirm onConfirm=(action externalAction "onConfirm")}}
        Test
      {{/control/md-button-confirm}}
    `);

    await click('button');
    await click('button');
  });
});
