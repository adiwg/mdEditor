import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-date-range', 'Integration | Component | input/md date range', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input/md-date-range}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#input/md-date-range}}
      template block text
    {{/input/md-date-range}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
