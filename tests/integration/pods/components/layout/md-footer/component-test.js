import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layout/md footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('settings', {
      data: {
        autoSave: false
      }
    });

    this.set('localStoragePercent', 9.08)
    await render(hbs`{{layout/md-footer settings=settings localStoragePercent=localStoragePercent}}`);

    assert.equal(find('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Report|Issue|:|9.08|%|AutoSave:|Off|');

      this.set('settings.data.autoSave', true);
    // Template block usage:
    await render(hbs`
      {{#layout/md-footer settings=settings localStoragePercent=localStoragePercent}}
        template block text
      {{/layout/md-footer}}
    `);

    assert.equal(find('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Report|Issue|:|9.08|%|AutoSave:|On|template|block|text|');
  });
});
