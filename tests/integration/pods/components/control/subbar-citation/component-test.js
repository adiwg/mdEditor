import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar citation', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/subbar-citation text="foobar"}}`);

    assert.equal(find('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(),
      '|Select|a|Record|foobar|');

    // Template block usage:
    await render(hbs`
      {{#control/subbar-citation}}
        template block text
      {{/control/subbar-citation}}
    `);

    assert.equal(find('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(),
      '|Select|a|Record|template|block|text|');
  });
});
