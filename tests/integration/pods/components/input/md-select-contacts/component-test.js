import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-select-contacts', 'Integration | Component | input/md select contacts', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input/md-select-contacts}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#input/md-select-contacts}}
      template block text
    {{/input/md-select-contacts}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
