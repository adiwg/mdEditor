import { click, find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tree branch', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

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

    this.set('selected', [{
      identifier: 'bar1'
    }]);

    this.set('path', [
      {label: 'fiz', identifier:1},
      {label: 'faz', identifier:10},
      {label: 'foz', identifier:100}
    ]);

    this.set('select', function () {
      assert.ok(true, 'called select');
    });

    await render(hbs `
      {{tree-branch model=model
          select=select
          selected=selected
          nodeDepth=3
          path=path
      }}`);

    assert.expect(3);

    assert.equal(find('*').textContent
      .trim(), 'foo1label');

    // Template block usage:
    await render(hbs `
      {{#tree-branch model=model
        select=select
        selected=selected
        nodeDepth=3
        path=path
      }}
        template block text
      {{/tree-branch}}
    `);

    await click('.tree-leaf .toggle-icon');

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|foo1label|foo2label|');

    assert.equal(this.$('.tree-leaf:last .tree-indent')
      .length, 3, 'proper indentation');

  });
});
