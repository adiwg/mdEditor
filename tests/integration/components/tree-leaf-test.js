import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'Integration | Component | tree leaf', {
  integration: true
});

test('it renders', function(assert) {
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

  this.render(hbs`{{tree-leaf model=model
    inTree=true
    select=select
    selected=selected
    nodeDepth=3
    nodePath=nodePath
  }}`);

  this.$('.toggle-icon').click();

  assert.equal(this.$().text().trim(), 'foo1label');

  // Template block usage:
  this.render(hbs`
    {{#tree-leaf model=model
      inTree=false
      select=select
      selected=selected
    }}
      template block text
    {{/tree-leaf}}
  `);

  assert.equal(this.$().text().trim(), 'foo1label');

  assert.equal(this.$('.tree-indent')
    .length, 0, 'not in tree');
});
