import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `
      {{input/md-input
        label="Foo"
        value="Bar"
        maxlength=100
        required="true"
        inputClass="test"
        placeholder="Enter FooBar"}}
    `);

    assert.dom('label').hasText('Foo', 'labeled OK');

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
    await render(hbs `
      {{#input/md-input}}
        <p class="help-block">help text</p>
      {{/input/md-input}}
    `);

    assert.dom('.help-block').hasText('help text', 'block renders');
  });
});
