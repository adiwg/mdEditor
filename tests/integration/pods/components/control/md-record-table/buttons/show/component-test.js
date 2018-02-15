import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-record-table/buttons/show', 'Integration | Component | control/md record table/buttons/show', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/md-record-table/buttons/show}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#control/md-record-table/buttons/show}}
      template block text
    {{/control/md-record-table/buttons/show}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
