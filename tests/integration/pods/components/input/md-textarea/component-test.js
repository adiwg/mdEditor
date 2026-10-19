import { fillIn, find, render, settled } from '@ember/test-helpers';
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

    assert.equal(find('textarea').value, 'Foo bar baz');

    assert.equal(find('label').textContent, 'FooBar', 'label renders');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#input/md-textarea class="testme"}}
        template block text
      {{/input/md-textarea}}
    `);

    assert.equal(find('.testme').textContent
      .trim(), 'template block text', 'block renders');
  });

  test('editing writes back through the two-way binding', async function(assert) {
    this.set('extent', { description: '' });

    await render(hbs `
      {{input/md-textarea value=this.extent.description label="Description"}}
    `);

    await fillIn('textarea', 'qweqwe');

    assert.equal(this.extent.description, 'qweqwe',
      'typed value propagates to the bound property');
  });

  test('a programmatic revert is reflected in the textarea', async function(assert) {
    this.set('description', 'original');

    await render(hbs `
      {{input/md-textarea value=this.description label="Description"}}
    `);

    await fillIn('textarea', 'qweqwe');

    this.set('description', 'original');
    await settled();

    assert.equal(find('textarea').value, 'original',
      'reverting the bound property resets the displayed value');
  });
});
