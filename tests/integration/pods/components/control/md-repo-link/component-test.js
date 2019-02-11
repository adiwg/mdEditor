import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'mdeditor/config/environment';

const {
  APP: {
    repository,
    version
  }
} = config;

module('Integration | Component | control/md repo link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{control/md-repo-link}}`);

    assert.equal(find('a').textContent
      .trim(), version);
    assert.equal(find('a').getAttribute('href'),
      `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`, 'link ok');

    // Template block usage:
    await render(hbs `
      {{#control/md-repo-link}}
        template block text
      {{/control/md-repo-link}}
    `);

    assert.equal(find('a').textContent
      .trim(), 'template block text', 'block ok');
  });
});
