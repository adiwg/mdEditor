import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md input confirm', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{input/md-input-confirm}}`);

    assert.equal(find('.md-input').textContent.trim(), 'Edit');
    assert.ok(find('.md-input input[disabled]'), 'input disabled');

    await click('.btn-warning');

    assert.equal(find('.md-input').textContent.trim(), 'Confirm', 'confirm ok');

    await click('.btn-warning');

    assert.ok(find('.md-input input:not([disabled])'), 'input enabled');

    // Template block usage:
    await render(hbs`
      {{#input/md-input-confirm}}
        template block text
      {{/input/md-input-confirm}}
    `);

    assert.equal(
      find('.md-input')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Edit|template|block|text|',
      'block'
    );
  });
});
