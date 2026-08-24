import {
  find,
  getRootElement,
  render,
  triggerEvent
} from '@ember/test-helpers';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, typeInSearch } from 'ember-power-select/test-support/helpers';

const foobar = {
  codelist: [{
    code: '001',
    codeName: 'foo',
    description: 'This is foo.'
  }, {
    code: '002',
    codeName: 'bar',
    description: 'This is bar.'
  }]
};

const codelist = Service.extend({
  foobar: foobar
});



module('Integration | Component | input/md codelist multi', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    this.owner.register('service:codelist', codelist);
    this.codelist = this.owner.lookup('service:codelist');
  });

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('fooVal', ['foo', 'bar']);

    // Template block usage:" + EOL +
    await render(hbs`
      {{#input/md-codelist-multi
        mdCodeName="foobar"
        value=this.fooVal
      }}
        <p>template block text</p>
      {{/input/md-codelist-multi}}
    `);

    assert.equal(find('.md-select').textContent
      .replace(/[ \n]+/g, '|'), '|×|bar|×|foo|',
      'renders block with array value');
  });

  test('set value action', async function(assert) {
    assert.expect(2);

    //this.set('fooVal', ['foo']);
    this.set('value', ['foo']);
    this.actions.update = (actual) => {
      assert.equal(actual, this.value,
        'submitted value is passed to external action');
    };

    await render(hbs`{{input/md-codelist-multi
      create=false
      value=this.value
      mdCodeName="foobar"
      change=(action "update" this.value)}}`);

      await clickTrigger();
      await triggerEvent(find('.ember-power-select-option'),'mouseup');

      assert.equal(getRootElement()
        .textContent
        .replace(/[ \n]+/g, '|'), '|×|bar|×|foo|',
        'value updated');
  });

  test('create option', async function(assert) {

    assert.expect(3);

    this.set('value', ['foo']);
    this.actions.update = (actual) => {
      assert.equal(actual, this.value,
        'submitted value is passed to external action');
    };

    await render(hbs`{{input/md-codelist-multi
      create=true
      value=this.value
      mdCodeName="foobar"
      change=(action "update" this.value)}}`);

      await clickTrigger();
      await typeInSearch('biz');
      await triggerEvent(find('.ember-power-select-option'),'mouseup');

      assert.equal(getRootElement()
        .textContent
        .replace(/[ \n]+/g, '|'), '|×|foo|×|biz|',
        'value updated');
  });

  test('selecting writes back through the two-way binding', async function(assert) {
    this.set('resource', { status: ['foo'] });

    await render(hbs`{{input/md-codelist-multi
      create=false
      value=this.resource.status
      mdCodeName="foobar"}}`);

    await clickTrigger();
    await triggerEvent(find('.ember-power-select-option'), 'mouseup');

    assert.deepEqual([...this.resource.status].sort(), ['bar', 'foo'],
      'selection propagates to the bound property');
  });
});
