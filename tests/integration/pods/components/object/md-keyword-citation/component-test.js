import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-keyword-citation', 'Integration | Component | object/md keyword citation', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-keyword-citation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-keyword-citation}}
      template block text
    {{/object/md-keyword-citation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
