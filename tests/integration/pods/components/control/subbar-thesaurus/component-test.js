import Route from '@ember/routing/route';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-thesaurus',
  'Integration | Component | control/subbar thesaurus', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{control/subbar-thesaurus}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Back|to|List|');

  // Template block usage:
  this.render(hbs `
    {{#control/subbar-thesaurus}}
      template block text
    {{/control/subbar-thesaurus}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'),
    '|Back|to|List|template|block|text|template|block|text|');
});

test('fire actions', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(1);

  var FakeRoute = Route.extend({
    actions: {
      toList: function () {
        assert.ok(true, 'calls toList action');
      }
    }
  });

  this.on('getContext', function () {
    return new FakeRoute();
  });

  this.render(hbs `{{control/subbar-thesaurus context=(action "getContext")}}`);

  this.$('button')
    .click();
});
