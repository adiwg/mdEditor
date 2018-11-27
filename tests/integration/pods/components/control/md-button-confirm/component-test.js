import { click, find, render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md button confirm', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `{{control/md-button-confirm}}`);

    assert.equal(find('*').textContent
      .trim(), '');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-button-confirm}}
        template block text
      {{/control/md-button-confirm}}
    `);

    assert.equal(find('*').textContent
      .trim(), 'template block text');
  });

  test('shows and cancels confirm', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-button-confirm}}
        Test
      {{/control/md-button-confirm}}
    `);

    assert.equal(find('*').textContent
      .trim(), 'Test', 'renders button');

    await click('button');

    assert.equal(find('*').textContent
      .trim(), 'Confirm', 'renders confirm');

    var $btn = this.$('button');
    run(function () {
      $btn
        .blur();
    });

    assert.equal(find('*').textContent
      .trim(), 'Test', 'cancels confirm');
  });

  test('performs confirm action', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('externalAction', (type) => {
      assert.ok(type, `${type} called`);
    });

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-button-confirm onConfirm=(action externalAction "onConfirm")}}
        Test
      {{/control/md-button-confirm}}
    `);

    await click('button')
      .click();
  });
});
