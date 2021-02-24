import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layout/md card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{layout/md-card title="foo"}}`);

    assert.dom('.md-card').hasText('foo');

    // await render(hbs`{{layout/md-card title="foo" collasped="true"}}`);

    // assert.equal(find('.md-card').textContent.trim(), 'foo');

    // Template block usage:
    await render(hbs`
      {{#layout/md-card}}
        template block text
      {{/layout/md-card}}
    `);

    assert.dom('.md-card').hasText('template block text', 'block');

    await render(hbs`
      {{#layout/md-card title="foo" collapsed=true collapsible=true}}
        template block text
      {{/layout/md-card}}
    `);

    assert.equal(find('.md-card').innerText.trim(), 'foo', 'collapsed');
    assert.dom('.md-card .card-block:not(.in)').exists('class ok');
  });
});
