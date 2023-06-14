import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md spinner', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-spinner text="foobar" size="5"}}`);

    assert.equal(find('.md-spinner').textContent.trim(), 'foobar');
    assert.ok(
      find('.md-spinner .md-spinner-text').classList.contains('size-5'),
      'adds class'
    );

    // Template block usage:
    await render(hbs`
      {{#control/md-spinner}}
        template block text
      {{/control/md-spinner}}
    `);

    assert.equal(
      find('.md-spinner').textContent.trim(),
      'template block text',
      'block ok'
    );
  });
});
