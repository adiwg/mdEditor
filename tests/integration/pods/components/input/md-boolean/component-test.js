import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md boolean', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `{{input/md-boolean value=false text="Foo Bar" label="Baz" }}`);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#input/md-boolean value=true text="Foo Bar" label="Baz"}}
        template block text
      {{/input/md-boolean}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');

    assert.ok(find('input').checked);
  });
});
