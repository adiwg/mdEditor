import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-taxonomy/collection', 'Integration | Component | object/md taxonomy/collection', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-taxonomy/collection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-taxonomy/collection}}
      template block text
    {{/object/md-taxonomy/collection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
