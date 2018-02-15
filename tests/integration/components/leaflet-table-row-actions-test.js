import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('leaflet-table-row-actions', 'Integration | Component | leaflet table row actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{leaflet-table-row-actions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#leaflet-table-row-actions}}
      template block text
    {{/leaflet-table-row-actions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
