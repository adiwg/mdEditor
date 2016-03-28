import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

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

  this.render(hbs `
    {{input/md-codelist-multi
    value='["foo","bar"]'
    create = true
    mdCodeName="foobar"}}
    `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|bar|foo|×bar×foo|',
    'renders with JSON string');

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
    .replace(/[ \n]+/g, '|'), '|bar|foo|template|block|text|×bar×foo|',
    'renders block with array value');
});

test('set value action', function(assert) {
  // test dummy for the external profile action
  this.on('update', (actual) => {
    assert.equal(actual, "['bar']",
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-codelist-multi
    create = true
    value='["foo"]'
    mdCodeName="foobar"
    change=(action "update" "['bar']")}}`);

  this.$('select')
    .trigger('change');
});
