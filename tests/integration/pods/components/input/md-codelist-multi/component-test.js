import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { clickTrigger, typeInSearch } from '../../../../../helpers/ember-power-select';
import { triggerEvent } from 'ember-native-dom-helpers';
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

moduleForComponent('input/md-codelist-multi',
  'Integration | Component | input/md codelist multi', {
    integration: true,
    beforeEach: function() {
      this.register('service:codelist', codelist);
      this.inject.service('codelist', {
        as: 'codelist'
      });
    }
  });

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('fooVal', ['foo', 'bar']);

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#input/md-codelist-multi
      mdCodeName="foobar"
      value=fooVal
    }}
      <p>template block text</p>
    {{/input/md-codelist-multi}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|×|bar|×|foo|',
    'renders block with array value');
});

test('set value action', function(assert) {
  var $this = this.$();

  assert.expect(2);

  //this.set('fooVal', ['foo']);
  this.set('value', ['foo']);
  this.on('update', (actual) => {
    assert.equal(actual, this.get('value'),
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-codelist-multi
    create=false
    value=value
    mdCodeName="foobar"
    change=(action "update" value)}}`);

    clickTrigger();
    triggerEvent($('.ember-power-select-option:contains("bar")').get(0),'mouseup');

    return wait().then(() => {
        assert.equal($this
        .text()
        .replace(/[ \n]+/g, '|'), '|×|bar|×|foo|bar|foo|',
        'value updated');
    });
});

test('create option', function(assert) {
  var $this = this.$();

  assert.expect(3);

  this.set('value', ['foo']);
  this.on('update', (actual) => {
    assert.equal(actual, this.get('value'),
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-codelist-multi
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
        .replace(/[ \n]+/g, '|'), '|×|foo|×|biz|bar|foo|biz|',
        'value updated');
    });
});
