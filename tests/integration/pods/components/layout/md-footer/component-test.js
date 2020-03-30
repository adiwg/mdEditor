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

    this.set('percent', 9.02)
    this.set('isOverThreshold', true)

    await render(hbs`{{layout/md-footer settings=settings percent=percent isOverThreshold=isOverThreshold}}`);

    assert.equal(find('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Report|Issue|:|9.02|%|AutoSave:|Off|');

      this.set('settings.data.autoSave', true);
      this.set('percent', 10.54)
      this.set('isOverThreshold', false)
    // Template block usage:
    await render(hbs`
      {{#layout/md-footer settings=settings percent=percent isOverThreshold=isOverThreshold}}
        template block text
      {{/layout/md-footer}}
    `);

    assert.equal(find('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Report|Issue|:|10.54|%|AutoSave:|On|template|block|text|');
  });
});
