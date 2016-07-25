import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-crud-buttons', 'Integration | Component | control/md crud buttons', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{control/md-crud-buttons}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#control/md-crud-buttons}}
      template block text
    {{/control/md-crud-buttons}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
