import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tree-label', 'Integration | Component | tree label', {
  integration: true
});

test('it renders', function (assert) {
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

  this.render(hbs `{{tree-label model=model}}`);

  assert.equal(this.$()
    .text()
    .trim(), 'foo1label');

  // Template block usage:
  this.render(hbs `
    {{#tree-label model=model}}
      template block text
    {{/tree-label}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'foo1label');
});
