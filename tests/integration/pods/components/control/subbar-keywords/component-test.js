import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-keywords',
  'Integration | Component | control/subbar keywords', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{control/subbar-keywords}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(), '|Add|Keywords|');

  // Template block usage:
  this.render(hbs `
    {{#control/subbar-keywords}}
      template block text
    {{/control/subbar-keywords}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(), '|Add|Keywords|template|block|text|');
});

test('fire actions', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(1);

  var FakeRoute = Ember.Route.extend({
    actions: {
      addThesaurus: function () {
        assert.ok(true, 'calls addThesaurus action');
      }
    }
  });

  this.on('getContext', function () {
    return new FakeRoute();
  });

  this.render(hbs `{{control/subbar-keywords context=(action "getContext")}}`);

  this.$('button')
    .click();
});
