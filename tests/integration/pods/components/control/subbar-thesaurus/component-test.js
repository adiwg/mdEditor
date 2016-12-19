import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-thesaurus', 'Integration | Component | control/subbar thesaurus', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/subbar-thesaurus}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#control/subbar-thesaurus}}
      template block text
    {{/control/subbar-thesaurus}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
