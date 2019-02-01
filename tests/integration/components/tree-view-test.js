import { find, findAll, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tree view', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders and expands', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', [{
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    }, {
      broader: 'bar0',
      children: [],
      label: 'bar1label',
      uuid: 'bar1'
    }]);

    this.set('selected', [{
      identifier: 'bar1'
    }]);

    this.set('select', function(){
      assert.ok(true, 'called select');
    });
    // Handle any actions with this.on('myAction', function(val) { ... });
    assert.expect(7);

    await render(hbs `{{tree-view model=model selected=selected}}`);

    assert.equal(find('.tree-trunk').innerText
      .replace(/[ \n]+/g, '|'), 'bar1label|foo1label|');

    assert.ok(find('.tree-leaf')
      .classList.contains('tree-highlight'), 'selected leaf highlighted');

    assert.equal(findAll('.tree-leaf .expand-icon')
      .length, 1, 'node expand icon rendered');

    await click(find('.expand-icon'));

    assert.equal(findAll('.tree-leaf').length, 3, 'node expanded');

    // Template block usage:
    await render(hbs `
      {{#tree-view model=model select=select}}
        template block text
      {{/tree-view}}
    `);

    assert.equal(find('.tree-trunk').innerText
      .replace(/[ \n]+/g, '|'), 'bar1label|foo1label|foo2label|');

    await click(findAll('.tree-leaf')[1]);

    assert.equal(findAll('.tree-leaf.tree-highlight').length, 2, 'node selected');
  });
});
