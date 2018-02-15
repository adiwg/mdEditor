import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-documentation/preview', 'Integration | Component | object/md documentation/preview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-documentation/preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-documentation/preview}}
      template block text
    {{/object/md-documentation/preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
