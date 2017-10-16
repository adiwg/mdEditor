import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sb-tree-label', 'Integration | Component | sb tree label', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sb-tree-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sb-tree-label}}
      template block text
    {{/sb-tree-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
