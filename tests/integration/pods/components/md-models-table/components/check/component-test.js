import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-models-table/components/check', 'Integration | Component | md models table/components/check', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{md-models-table/components/check}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#md-models-table/components/check}}
      template block text
    {{/md-models-table/components/check}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
