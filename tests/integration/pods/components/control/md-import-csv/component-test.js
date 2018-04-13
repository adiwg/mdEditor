import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-import-csv', 'Integration | Component | control/md import csv', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/md-import-csv}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#control/md-import-csv}}
      template block text
    {{/control/md-import-csv}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
