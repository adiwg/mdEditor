import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-keywords', 'Integration | Component | control/subbar keywords', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/subbar-keywords}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#control/subbar-keywords}}
      template block text
    {{/control/subbar-keywords}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
