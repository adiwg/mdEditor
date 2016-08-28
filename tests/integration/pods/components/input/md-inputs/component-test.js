import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-inputs',
  'Integration | Component | input/md inputs', {
    integration: true
  });

test('it renders', function(assert) {
  assert.expect(3);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('model', ['Foo', 'Bar', '']);

  this.render(hbs `
    {{input/md-inputs
      model=model
      header="Header"
      placeholder="Enter Line"
      label="Lines"
      buttonText="Add One"
      maxlength=100}}
    `);

  assert.equal(this.$()
    .text()
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
  this.render(hbs `
    {{#input/md-inputs
      buttonTop=true
    }}
      template block text
    {{/input/md-inputs}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'),
    '|Add|template|block|text|', 'block renders ok');
});

test('should update items', function(assert) {
  //assert.expect(3);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('model', ['foo']);

  this.render(hbs `
    {{input/md-inputs
      model=model}}
    `);

  assert.equal(
    this.$('input')
    .val(),
    'foo', 'starts as foo');

  this.set('model', ['bar']);
  assert.equal(
    this.$('input')
    .val(),
    'bar', 'updates to bar');

  this.set('model', ['bar', 'baz']);
  assert.equal(
    this.$('input')
    .length,
    2, 'adds line');
});

test('should add/delete item', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('model', ['foo']);

  this.render(hbs `
    {{input/md-inputs
      model=model}}
    `);

  this.$('.btn-success').click();

  assert.equal(this.$('input').length, 2, 'adds item');

  this.$('.btn-warning').first().click();

  assert.equal(this.$('input').length, 1, 'deletes item');

});

test('add item action', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('model', ['foo']);

  this.set('addItem', () => {
    assert.ok(true, 'addItem action');
  });

  this.render(hbs `
    {{input/md-inputs
      model=model
      addItem=addItem}}
    `);

  this.$('.btn-success').click();
});

test('delete item actions', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('model', ['foo']);

  this.set('deleteItem', (idx) => {
    assert.ok((idx > -1), 'deleteItem action');
  });

  this.render(hbs `
    {{input/md-inputs
      model=model
      deleteItem=deleteItem}}
    `);

  this.$('.btn-warning').first().click();
});
