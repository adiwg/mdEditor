import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders md-input', async function (assert) {
    await render(hbs`
      {{input/md-input
        label="Foo"
        value="Bar"
        showInfoTip="true"
        maxlength=100
        required="true"
        inputClass="test"
        placeholder="Enter FooBar"}}
    `);

    assert.equal(find('label').textContent.trim(), 'Foo', 'labeled OK');

    const input = this.$('input');
    const props = [
      input.prop('required'),
      input.prop('maxlength'),
      input.val(),
      input.prop('placeholder'),
      input.hasClass('test'),
    ];
    assert.deepEqual(
      props,
      [true, 100, 'Bar', 'Enter FooBar', true],
      'properties set OK'
    );

    // Template block usage:" + EOL +
    await render(hbs`
      {{#input/md-input}}
        <p class="help-block">help text</p>
      {{/input/md-input}}
    `);

    assert.equal(find('.help-block').textContent, 'help text', 'block renders');
  });
});
