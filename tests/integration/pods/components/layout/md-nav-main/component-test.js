import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md nav main', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{layout/md-nav-main}}`);

    assert.equal(find('nav').innerText
      .replace(/[ \n]+/g, '|'),
      '|Dashboard|Export|Import|Publish|Settings');

    // Template block usage:
    await render(hbs `
      {{#layout/md-nav-main}}
        template block text
      {{/layout/md-nav-main}}
    `);

    assert.equal(find('nav').innerText
      .replace(/[ \n]+/g, '|'),
      '|Dashboard|Export|Import|Publish|template|block|text|Settings'
    );
  });
});
