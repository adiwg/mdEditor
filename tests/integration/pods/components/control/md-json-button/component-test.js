import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-json-button',
  'Integration | Component | control/md json button', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('json', {
    foo: 'bar'
  });

  this.render(hbs `{{control/md-json-button}}`);

  assert.equal(this.$()
    .text()
    .trim(), 'Preview JSON');

  // Template block usage:
  this.render(hbs `
    {{#control/md-json-button}}
      template block text
    {{/control/md-json-button}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'template block text');
});

test('render json modal', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('json', {
    foo: 'bar'
  });

  this.render(hbs `{{control/md-json-button json=json}}`);

this.$('button').click();

  assert.equal(Ember.$('.md-jsmodal-container')
    .text()
    .trim(), '{"foo": "bar"}');
});
