import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-address/md-address-block', 'Integration | Component | object/md address/md address block', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-address/md-address-block}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-address/md-address-block}}
      template block text
    {{/object/md-address/md-address-block}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
