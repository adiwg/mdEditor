import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-modal isShowing=true}}`);

    assert.ok(document.querySelector('.md-modal-container'));

    // Template block usage:
    await render(hbs`
      {{#control/md-modal isShowing=true}}
        template block text
      {{/control/md-modal}}
    `);

    assert.equal(
      document.querySelector('.md-modal-container').textContent.trim(),
      'template block text'
    );
  });
});
