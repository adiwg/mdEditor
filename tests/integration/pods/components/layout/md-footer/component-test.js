import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layout/md footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('settings', {
      data: {
        autoSave: false
      }
    });

    this.set('storagePercent', 9.08)

    await render(hbs`{{layout/md-footer settings=settings storagePercent=storagePercent}}`);

    assert.equal(find('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Local|Storage|=|9.08%|Report|Issue|AutoSave:|Off|');

      this.set('settings.data.autoSave', true);
    // Template block usage:
    await render(hbs`
      {{#layout/md-footer settings=settings storagePercent=storagePercent}}
        template block text
      {{/layout/md-footer}}
    `);

    assert.equal(find('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Local|Storage|=|9.08%|Report|Issue|AutoSave:|On|template|block|text|');
  });
});
