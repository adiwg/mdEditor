import {
  moduleForComponent, test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-select',
  'Integration | Component | input/md select', {
    integration: true
  });

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('objArray', [Ember.Object.create({
    id: 1,
    name: 'foo',
    tip: 'bar'
  })]);

  this.render(hbs `
    {{input/md-select
      value=1
      objectArray=objArray
      valuePath="id"
      namePath="name"
      tooltipPath="tip"
      placeholder="Select one"}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo|foo|', 'renders ok');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#input/md-select
      value=1
      objectArray=objArray
      valuePath="id"
      namePath="name"
      }}
      <option value="2" >bar</option>
    {{/input/md-select}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo|bar|foo|', 'renders block ok');
});

test('set value', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('objArray', [Ember.Object.create({
    id: 1,
    name: 'foo',
    tip: 'bar'
  }), Ember.Object.create({
    id: 2,
    name: 'baz',
    tip: 'biz'
  })]);

  this.set('val', '1');

  this.render(hbs `
    {{input/md-select
      value=val
      objectArray=objArray
      valuePath="id"
      namePath="name"}}
  `);

  this.$('select')
    .val(2)
    .trigger('change');

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo|baz|baz|', 'display value updates');

  assert.equal(this.get('val'), 2, 'value is set');
});
