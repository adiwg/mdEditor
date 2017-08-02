import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-citation/preview/body', 'Integration | Component | object/md citation/preview/body', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-citation/preview/body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-citation/preview/body}}
      template block text
    {{/object/md-citation/preview/body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
