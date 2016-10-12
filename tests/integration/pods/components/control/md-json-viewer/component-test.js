import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-json-viewer', 'Integration | Component | control/md json viewer', {
  integration: true
});

test('render json modal', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('json', {
    foo: 'bar'
  });

  this.render(hbs `{{control/md-json-viewer json=json}}`);

  assert.equal(Ember.$('.md-jsmodal-container')
    .text()
    .trim(), '{"foo": "bar"}');
});

test('render json viewer', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('json', {
    foo: 'bar'
  });

  this.render(hbs `{{control/md-json-viewer json=json modal=false}}`);

  assert.equal(this.$()
    .text()
    .trim(), '{"foo": "bar"}');
});
