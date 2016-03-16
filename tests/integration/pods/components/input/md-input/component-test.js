import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-input', 'Integration | Component | input/md input', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `
    {{input/md-input
      label="Foo"
      value="Bar"
      maxlength=100
      required="true"
      class="test"
      placeholder="Enter FooBar"}}
  `);

  assert.equal(this.$('label')
    .text(), 'Foo', 'labeled OK');

  const input = this.$('input');
  const props = [
    input.prop('required'),
    input.prop('maxlength'),
    input.val(),
    input.prop('placeholder'),
    input.hasClass('test')
  ];
  assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true],
    'properties set OK');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#input/md-input}}
      <p class="help-block">help text</p>
    {{/input/md-input}}
  `);

  assert.equal(this.$('.help-block').text(), 'help text', 'block renders');
});
