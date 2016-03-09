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

moduleForComponent('input/md-input-codelist-single',
  'Integration | Component | input/md input codelist single', {
    integration: true,
    beforeEach: function() {
      this.register('service:codelist', codelist);
      this.inject.service('codelist', {
        as: 'codelist'
      });
    }
  });

test('it renders', function(assert) {
  assert.expect(2);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{input/md-input-codelist-single
    value='foo' mdCodeName="foobar"}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|bar|foo|foo|');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#input/md-input-codelist-single value='foo' mdCodeName="foobar"}}
      <option value="baz">baz</option>
    {{/input/md-input-codelist-single}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|bar|foo|baz|foo|', 'render block ok');
});

test('set value action', function(assert) {
  // test dummy for the external profile action
  this.on('update', (actual) => {
    assert.equal(actual, 'bar',
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-input-codelist-single
    value='foo' mdCodeName="foobar"
    change=(action "update" "bar")}}`);

  this.$('select')
    .trigger('change');
});
