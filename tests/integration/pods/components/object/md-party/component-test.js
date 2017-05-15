import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-party', 'Integration | Component | object/md party', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{object/md-party}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#object/md-party}}
      template block text
    {{/object/md-party}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
