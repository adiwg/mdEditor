import { click, find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tree leaf', function(hooks) {
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
      identifier: 'foo1'
    }]);

    this.set('nodePath', [
      {label: 'fiz', identifier:1},
      {label: 'faz', identifier:10},
      {label: 'foz', identifier:100}
    ]);

    this.set('select', function () {
      assert.ok(true, 'called select');
    });

    await render(hbs`{{tree-leaf model=this.model
      inTree=true
      select=this.select
      selected=this.selected
      nodeDepth=3
      nodePath=this.nodePath
    }}`);

    await click('.toggle-icon');

    assert.equal(find('.tree-leaf').innerText.trim(), 'foo1label');

    // Template block usage:
    await render(hbs`
      <TreeLeaf @model={{this.model}} @inTree={{false}} @select={{this.select}} @selected={{this.selected}}>
        template block text
      </TreeLeaf>
    `);

    assert.equal(find('.tree-leaf').innerText.trim(), 'foo1label');

    assert.equal(findAll('.tree-indent').length, 0, 'not in tree');
  });
});
