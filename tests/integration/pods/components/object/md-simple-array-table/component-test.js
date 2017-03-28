import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-simple-array-table', 'Integration | Component | object/md simple array table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-simple-array-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-simple-array-table}}
      template block text
    {{/object/md-simple-array-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
