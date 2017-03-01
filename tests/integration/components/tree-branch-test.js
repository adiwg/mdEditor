import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'Integration | Component | tree branch', {
  integration: true
});

test('it renders', function (assert) {
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

  this.render(hbs `
    {{tree-branch model=model
        select=select
        selected=selected
        nodeDepth=3
        path=path
    }}`);

  assert.expect(3);

  assert.equal(this.$()
    .text()
    .trim(), 'foo1label');

  // Template block usage:
  this.render(hbs `
    {{#tree-branch model=model
      select=select
      selected=selected
      nodeDepth=3
      path=path
    }}
      template block text
    {{/tree-branch}}
  `);

  this.$('.tree-leaf .toggle-icon')
    .click();

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo1label|foo2label|');

  assert.equal(this.$('.tree-leaf:last .tree-indent')
    .length, 3, 'proper indentation');

});
