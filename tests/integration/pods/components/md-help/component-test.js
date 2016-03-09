import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-help', 'Integration | Component | md help', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{md-help}}`);

  assert.ok(this.$()
    .text()
    .indexOf('Lorem ipsum' > 0));

  // Template block usage:
  this.render(hbs `
    {{#md-help}}
      template block text
    {{/md-help}}
  `);

  assert.ok(this.$()
    .text()
    .trim()
    .indexOf('template block text' > 0));
});
