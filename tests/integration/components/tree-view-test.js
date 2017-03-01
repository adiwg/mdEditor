import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tree-view', 'Integration | Component | tree view', {
  integration: true
});

test('it renders and expands', function (assert) {
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

  this.render(hbs `{{tree-view model=model selected=selected}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|bar1label|foo1label|');

  assert.ok(this.$('.tree-leaf:first')
    .hasClass('tree-highlight'), 'selected leaf highlighted');

  assert.equal(this.$('.tree-leaf:last .expand-icon')
    .length, 1, 'node expand icon rendered');

  this.$('.tree-leaf:last .expand-icon')
    .click();

  assert.equal(this.$('.tree-leaf')
    .length, 3, 'node expanded');

  // Template block usage:
  this.render(hbs `
    {{#tree-view model=model select=select}}
      template block text
    {{/tree-view}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|bar1label|foo1label|foo2label|');

  this.$('.tree-leaf:last')
    .click();

  assert.equal(this.$('.tree-leaf.tree-highlight')
    .length, 2, 'node selected');
});
