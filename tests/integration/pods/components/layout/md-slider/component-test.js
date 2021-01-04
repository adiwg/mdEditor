import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layout/md slider', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{layout/md-slider}}`);

    assert.dom('.md-slider').hasText('Close');

    // Template block usage:
    await render(hbs`
      {{#layout/md-slider fromName="slider"}}
        template block text
      {{/layout/md-slider}}
      {{to-elsewhere named="slider"
        send=(hash
          title="biz"
          body=(component "layout/md-card" title="foobar"))
      }}
    `);

    assert.equal(find('.md-slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Close|biz|foobar|template|block|text|');
    assert.dom('.md-card').exists('rendered slider content');
  });
});
