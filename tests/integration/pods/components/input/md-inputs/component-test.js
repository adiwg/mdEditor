import { click, find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md inputs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['Foo', 'Bar', '']);

    await render(hbs `
      {{input/md-inputs
        model=model
        header="Header"
        placeholder="Enter Line"
        label="Lines"
        buttonText="Add One"
        maxlength=100}}
      `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'),
      '|Lines|#|Header|0|Delete!|1|Delete!|2|Delete!|Add|One|',
      'it renders ok');

    const input = this.$('input')
      .first();
    const props = [
      input.prop('maxlength'),
      input.val(),
      input.prop('placeholder')
    ];
    assert.deepEqual(props, [100, 'Foo', 'Enter Line'],
      'properties set ok');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#input/md-inputs
        buttonTop=true
      }}
        template block text
      {{/input/md-inputs}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'),
      '|Add|template|block|text|', 'block renders ok');
  });

  test('should update items', async function(assert) {
    //assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    await render(hbs `
      {{input/md-inputs
        model=model}}
      `);

    assert.equal(
      find('input').value,
      'foo', 'starts as foo');

    this.set('model', ['bar']);
    assert.equal(
      find('input').value,
      'bar', 'updates to bar');

    this.set('model', ['bar', 'baz']);
    assert.equal(
      findAll('input').length,
      2, 'adds line');
  });

  test('should add/delete item', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    await render(hbs `
      {{input/md-inputs
        model=model}}
      `);

    await click('.btn-success');

    assert.equal(findAll('input').length, 2, 'adds item');

    this.$('.btn-warning').first().click();

    assert.equal(findAll('input').length, 1, 'deletes item');

  });

  test('add item action', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.set('addItem', () => {
      assert.ok(true, 'addItem action');
    });

    await render(hbs `
      {{input/md-inputs
        model=model
        addItem=addItem}}
      `);

    await click('.btn-success');
  });

  test('delete item actions', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.set('deleteItem', (idx) => {
      assert.ok((idx > -1), 'deleteItem action');
    });

    await render(hbs `
      {{input/md-inputs
        model=model
        deleteItem=deleteItem}}
      `);

    this.$('.btn-warning').first().click();
  });
});
