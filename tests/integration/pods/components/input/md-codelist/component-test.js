import { find, render, settled } from '@ember/test-helpers';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, typeInSearch } from '../../../../../helpers/ember-power-select';
import { triggerEvent } from 'ember-native-dom-helpers';

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

module('Integration | Component | input/md-codelist', function(hooks) {
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
    assert.expect(1);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `{{input/md-codelist
      value='foo' mdCodeName="foobar"}}`);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|foo|×|');
  });

  test('set value action', async function(assert) {
    assert.expect(2);

    this.set('value', ['foo']);
    this.actions.update = (actual) => {
      assert.equal(actual, this.get('value'),
        'submitted value is passed to external action');
    };

    await render(hbs `{{input/md-codelist
      value=value mdCodeName="foobar"
      change=(action "update" value)}}`);

      clickTrigger();
      triggerEvent(find('.ember-power-select-option'),'mouseup');

      return settled().then(() => {
          assert.equal(find('*')
          .textContent
          .replace(/[ \n]+/g, '|'), '|bar|×|',
          'value updated');
      });
  });

  test('create option', async function(assert) {
    assert.expect(2);

    this.set('value', ['foo']);
    this.actions.update = (actual) => {
      assert.equal(actual, this.get('value'),
        'submitted value is passed to external action');
    };

    await render(hbs `{{input/md-codelist
      create=true
      value=value
      mdCodeName="foobar"
      change=(action "update" value)}}`);

      clickTrigger();
      typeInSearch('biz');
      triggerEvent(find('.ember-power-select-option'),'mouseup');

      return settled().then(() => {
          assert.equal(find('*')
          .textContent
          .replace(/[ \n]+/g, '|'), '|biz|×|',
          'value updated');
      });
  });
});
