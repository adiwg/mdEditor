import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/md-nav-main', 'Integration | Component | md nav main', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/md-nav-main}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/md-nav-main}}
      template block text
    {{/layout/md-nav-main}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
