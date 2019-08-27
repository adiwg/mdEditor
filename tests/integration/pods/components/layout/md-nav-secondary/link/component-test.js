import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layout/md-nav-secondary/link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{layout/md-nav-secondary/link}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#layout/md-nav-secondary/link}}
        template block text
      {{/layout/md-nav-secondary/link}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
