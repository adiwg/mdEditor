import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-markdown-area', 'Integration | Component | input/md markdown area', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input/md-markdown-area}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#input/md-markdown-area}}
      template block text
    {{/input/md-markdown-area}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
