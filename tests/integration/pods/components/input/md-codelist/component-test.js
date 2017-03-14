import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { clickTrigger, typeInSearch } from '../../../../../helpers/ember-power-select';
import { triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';
import wait from 'ember-test-helpers/wait';

const codelist = Ember.Service.extend({
  foobar: {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  }
});

moduleForComponent('input/md-codelist',
  'Integration | Component | input/md-codelist', {
    integration: true,
    beforeEach: function() {
      this.register('service:codelist', codelist);
      this.inject.service('codelist', {
        as: 'codelist'
      });
    }
  });

test('it renders', function(assert) {
  assert.expect(1);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{input/md-codelist
    value='foo' mdCodeName="foobar"}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|foo|×|');
});

test('set value action', function(assert) {
  let $this = this.$();

  assert.expect(2);

  this.set('value', ['foo']);
  this.on('update', (actual) => {
    assert.equal(actual, this.get('value'),
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-codelist
    value=value mdCodeName="foobar"
    change=(action "update" value)}}`);

    clickTrigger();
    triggerEvent($('.ember-power-select-option:contains("bar")').get(0),'mouseup');

    return wait().then(() => {
        assert.equal($this
        .text()
        .replace(/[ \n]+/g, '|'), '|bar|×|',
        'value updated');
    });
});

test('create option', function(assert) {
  var $this = this.$();

  assert.expect(2);

  this.set('value', ['foo']);
  this.on('update', (actual) => {
    assert.equal(actual, this.get('value'),
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-codelist
    create=true
    value=value
    mdCodeName="foobar"
    change=(action "update" value)}}`);

    clickTrigger();
    typeInSearch('biz');
    triggerEvent($('.ember-power-select-option:contains("biz")').get(0),'mouseup');

    return wait().then(() => {
        assert.equal($this
        .text()
        .replace(/[ \n]+/g, '|'), '|biz|×|',
        'value updated');
    });
});
