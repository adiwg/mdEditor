import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-button-confirm',
  'Integration | Component | control/md button confirm', {
    integration: true
  });

test('it renders', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{control/md-button-confirm}}`);

  assert.equal(this.$()
    .text()
    .trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#control/md-button-confirm}}
      template block text
    {{/control/md-button-confirm}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'template block text');
});

test('shows and cancels confirm', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#control/md-button-confirm}}
      Test
    {{/control/md-button-confirm}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'Test', 'renders button');

  this.$('button')
    .click();

  assert.equal(this.$()
    .text()
    .trim(), 'Confirm', 'renders confirm');

  Ember.run(function () {
    this.$('button')
      .blur();
  });

  assert.equal(this.$()
    .text()
    .trim(), 'Test', 'cancels confirm');
});

test('performs confirm action', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('externalAction', (type) => {
    assert.ok(type, `${type} called`);
  });

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#control/md-button-confirm onConfirm=(action externalAction "onConfirm")}}
      Test
    {{/control/md-button-confirm}}
  `);

  this.$('button')
    .click()
    .click();
});
