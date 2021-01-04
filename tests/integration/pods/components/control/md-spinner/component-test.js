import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md spinner', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-spinner text="foobar" size="5"}}`);

    assert.dom('.md-spinner').hasText('foobar');
    assert.dom('.md-spinner .md-spinner-text').hasClass('size-5', 'adds class');

    // Template block usage:
    await render(hbs`
      {{#control/md-spinner}}
        template block text
      {{/control/md-spinner}}
    `);

    assert.dom('.md-spinner').hasText('template block text', 'block ok');
  });
});
