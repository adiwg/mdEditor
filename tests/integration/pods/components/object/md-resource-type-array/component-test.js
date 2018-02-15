import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-resource-type-array', 'Integration | Component | object/md resource type array', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-resource-type-array}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-resource-type-array}}
      template block text
    {{/object/md-resource-type-array}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
