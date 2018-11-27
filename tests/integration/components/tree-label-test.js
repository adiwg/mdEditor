import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tree label', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    });
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{tree-label model=model}}`);

    assert.equal(find('*').textContent
      .trim(), 'foo1label');

    // Template block usage:
    await render(hbs `
      {{#tree-label model=model}}
        template block text
      {{/tree-label}}
    `);

    assert.equal(find('*').textContent
      .trim(), 'foo1label');
  });
});
