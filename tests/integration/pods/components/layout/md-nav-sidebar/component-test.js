import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/md-nav-sidebar', 'Integration | Component | md nav sidebar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/md-nav-sidebar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/md-nav-sidebar}}
      template block text
    {{/layout/md-nav-sidebar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
