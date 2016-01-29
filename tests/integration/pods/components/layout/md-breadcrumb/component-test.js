import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-breadcrumb', 'Integration | Component | md breadcrumb', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{md-breadcrumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#md-breadcrumb}}
      template block text
    {{/md-breadcrumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
