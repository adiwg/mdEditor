import { find, findAll, render, settled, triggerEvent } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, typeInSearch } from 'ember-power-select/test-support/helpers';

module('Integration | Component | input/md select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [EmberObject.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    })]);

    await render(hbs `
      {{input/md-select
        value=1
        objectArray=objArray
        valuePath="id"
        namePath="name"
        tooltipPath="tip"
        placeholder="Select one"}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
  });

  test('set value', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [EmberObject.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    }), EmberObject.create({
      id: 2,
      name: 'baz',
      tip: 'biz'
    })]);

    this.set('value', 1);

    await render(hbs `
      {{input/md-select
        value=value
        objectArray=objArray
        valuePath="id"
        namePath="name"}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|foo|', 'value set');

      clickTrigger();
      triggerEvent(findAll('.ember-power-select-option')[1],'mouseup');
      return settled().then(() => {
        assert.equal(find('*').textContent
          .replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');

        assert.equal(this.get('value'), 2, 'value is updated');
      });
  });

  test('create option', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [EmberObject.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    }), EmberObject.create({
      id: 2,
      name: 'baz',
      tip: 'biz'
    })]);

    this.set('value', 1);

    await render(hbs `
      {{input/md-select
        value=value
        create=true
        objectArray=objArray
        valuePath="id"
        namePath="name"}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|foo|', 'value set');

      clickTrigger();
      typeInSearch('biz');
      triggerEvent(find('.ember-power-select-option'),'mouseup');
      return settled().then(() => {
        assert.equal(find('*').textContent
          .replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');

        assert.equal(this.get('value'), 'biz', 'value is updated');
      });
  });
});
