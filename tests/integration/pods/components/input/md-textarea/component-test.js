import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-textarea',
  'Integration | Component | input/md textarea', {
    integration: true
  });

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `
    {{input/md-textarea
    value="Foo bar baz"
    label="FooBar"
    placeholder="placeholder"
    rows=10}}
    `);

  assert.equal(this.$('textarea')
    .val(), 'Foo bar baz');

  assert.equal(this.$('label')
    .text(), 'FooBar', 'label renders');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#input/md-textarea}}
      template block text
    {{/input/md-textarea}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'template block text', 'block renders');
});
