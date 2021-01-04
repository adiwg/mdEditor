import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md textarea', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `
      {{input/md-textarea
      value="Foo bar baz"
      label="FooBar"
      placeholder="placeholder"
      rows=10}}
      `);

    assert.dom('textarea').hasValue('Foo bar baz');

    assert.dom('label').hasText('FooBar', 'label renders');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#input/md-textarea class="testme"}}
        template block text
      {{/input/md-textarea}}
    `);

    assert.dom('.testme').hasText('template block text', 'block renders');
  });
});
