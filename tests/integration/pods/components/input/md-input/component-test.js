import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | input/md input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders md-input', async function(assert) {

    await render(hbs `
      {{input/md-input
        label="Foo"
        value="Bar"
        maxlength=100
        required="true"
        inputClass="test"
        placeholder="Enter FooBar"}}
    `);

    assert.equal(find('label').textContent.trim(), 'Foo', 'labeled OK');

    const input = find('input');
    const props = [
      input.required,
      input.maxLength,
      input.value,
      input.placeholder,
      input.classList.contains('test')
    ];
    assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true],
      'properties set OK');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#input/md-input}}
        <p class="help-block">help text</p>
      {{/input/md-input}}
    `);

    assert.equal(find('.help-block').textContent, 'help text', 'block renders');
  });

  test('it accepts required when bound to a model', async function(assert) {
    this.set('model', EmberObject.create({ title: 'Hello' }));

    await render(hbs`
      {{input/md-input
        model=this.model
        valuePath="title"
        label="Title"
        required=true
      }}
    `);

    assert.dom('input').hasAttribute('required');
    assert.dom('.md-input').hasClass('required');
  });
});
