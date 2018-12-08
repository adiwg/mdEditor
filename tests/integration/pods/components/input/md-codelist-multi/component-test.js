import { find, getRootElement, render, settled, triggerEvent } from '@ember/test-helpers';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, typeInSearch } from '../../../../../helpers/ember-power-select';

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
    await render(hbs `
      {{#input/md-codelist-multi
        mdCodeName="foobar"
        value=fooVal
      }}
        <p>template block text</p>
      {{/input/md-codelist-multi}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|×|bar|×|foo|',
      'renders block with array value');
  });

  test('set value action', async function(assert) {
    assert.expect(2);

    //this.set('fooVal', ['foo']);
    this.set('value', ['foo']);
    this.actions.update = (actual) => {
      assert.equal(actual, this.get('value'),
        'submitted value is passed to external action');
    };

    await render(hbs `{{input/md-codelist-multi
      create=false
      value=value
      mdCodeName="foobar"
      change=(action "update" value)}}`);

      clickTrigger();
      triggerEvent(find('.ember-power-select-option'),'mouseup');

      return settled().then(() => {
          assert.equal(getRootElement()
          .textContent
          .replace(/[ \n]+/g, '|'), '|×|bar|×|foo|bar|foo|',
          'value updated');
      });
  });

  test('create option', async function(assert) {

    assert.expect(3);

    this.set('value', ['foo']);
    this.actions.update = (actual) => {
      assert.equal(actual, this.get('value'),
        'submitted value is passed to external action');
    };

    await render(hbs `{{input/md-codelist-multi
      create=true
      value=value
      mdCodeName="foobar"
      change=(action "update" value)}}`);

      clickTrigger();
      typeInSearch('biz');
      triggerEvent(find('.ember-power-select-option'),'mouseup');

      return settled().then(() => {
          assert.equal(getRootElement()
          .textContent
          .replace(/[ \n]+/g, '|'), '|×|foo|×|biz|bar|foo|biz|',
          'value updated');
      });
  });
});
