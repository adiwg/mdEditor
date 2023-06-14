import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('myAction', function (val) {
      assert.ok(val, 'Click action');
    });

    await render(
      hbs`{{control/md-button text="Click me" click=(action myAction true)}}`
    );

    assert.equal(this.element.textContent.trim(), 'Click me');
    click('.md-button');

    // Template block usage:
    await render(hbs`
      {{#control/md-button}}
        template block text
      {{/control/md-button}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
