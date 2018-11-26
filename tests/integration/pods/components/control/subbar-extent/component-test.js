import Route from '@ember/routing/route';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-spatial',
  'Integration | Component | control/subbar spatial', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{control/subbar-spatial}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(), '|Add|Spatial|Extent|');

  // Template block usage:
  this.render(hbs `
    {{#control/subbar-spatial}}
      template block text
    {{/control/subbar-spatial}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(),
    '|Add|Spatial|Extent|template|block|text|'
  );
});

test('fire actions', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(1);

  var FakeRoute = Route.extend({
    actions: {
      addExtent: function () {
        assert.ok(true, 'calls addExtent action');
      }
    }
  });

  this.on('getContext', function () {
    return new FakeRoute();
  });

  this.render(hbs `{{control/subbar-spatial context=(action "getContext")}}`);

  this.$('button')
    .click();
});
