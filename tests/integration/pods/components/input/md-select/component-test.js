import {
  moduleForComponent, test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, typeInSearch } from '../../../../../helpers/ember-power-select';
import { triggerEvent } from 'ember-native-dom-helpers';
import wait from 'ember-test-helpers/wait';

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
    .replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
});

test('set value', function(assert) {
  assert.expect(3);

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

  this.set('value', 1);

  this.render(hbs `
    {{input/md-select
      value=value
      objectArray=objArray
      valuePath="id"
      namePath="name"}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo|', 'value set');

    clickTrigger();
    triggerEvent($('.ember-power-select-option:contains("baz")').get(0),'mouseup');
    return wait().then(() => {
      assert.equal(this.$()
        .text()
        .replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');

      assert.equal(this.get('value'), 2, 'value is updated');
    });
});

test('create option', function(assert) {
  assert.expect(3);

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

  this.set('value', 1);

  this.render(hbs `
    {{input/md-select
      value=value
      create=true
      objectArray=objArray
      valuePath="id"
      namePath="name"}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo|', 'value set');

    clickTrigger();
    typeInSearch('biz');
    triggerEvent($('.ember-power-select-option:contains("biz")').get(0),'mouseup');
    return wait().then(() => {
      assert.equal(this.$()
        .text()
        .replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');

      assert.equal(this.get('value'), 'biz', 'value is updated');
    });
});
