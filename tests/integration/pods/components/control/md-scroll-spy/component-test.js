import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-scroll-spy', 'Integration | Component | control/md scroll spy', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/md-scroll-spy}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#control/md-scroll-spy}}
      template block text
    {{/control/md-scroll-spy}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
