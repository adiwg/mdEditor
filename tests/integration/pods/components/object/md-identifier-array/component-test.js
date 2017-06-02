import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-identifier-array', 'Integration | Component | object/md identifier array', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-identifier-array}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-identifier-array}}
      template block text
    {{/object/md-identifier-array}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
