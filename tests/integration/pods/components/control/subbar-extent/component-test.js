import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-extent',
  'Integration | Component | control/subbar extent', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  var FakeRoute = Ember.Route.extend({
    actions: {
      deleteAllFeatures: function () {
        assert.ok(true, 'calls deleteAllFeatures action');
      }
    }
  });

  this.set('getContext', function () {
    return new FakeRoute();
  });

  this.render(hbs `{{control/subbar-extent context=getContext}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(),
    '|Zoom|All|Import|Features|Export|Features|Delete|All|'
  );

  // Template block usage:
  this.render(hbs `
    {{#control/subbar-extent context=getContext}}
      template block text
    {{/control/subbar-extent}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(),
    '|Zoom|All|Import|Features|Export|Features|Delete|All|template|block|text|'
  );
});

test('fire actions', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(4);

  var FakeRoute = Ember.Route.extend({
    actions: {
      zoomAll: function () {
        assert.ok(true, 'calls zoomAll action');
      },
      uploadData: function () {
        assert.ok(true, 'calls uploadData action');
      },
      exportGeoJSON: function () {
        assert.ok(true, 'calls exportGeoJSON action');
      },
      deleteAllFeatures: function () {
        assert.ok(true, 'calls deleteAllFeatures action');
      }
    }
  });

  this.on('getContext', function () {
    return new FakeRoute();
  });

  this.render(hbs `{{control/subbar-extent context=(action "getContext")}}`);

  this.$('button')
    .each(function (i, v) {
      v.click();
      if($(v)
        .text()
        .trim() === 'Confirm') {
        v.click();
      }
    });
});
