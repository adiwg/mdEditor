import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/subbar-extent', 'Integration | Component | control/subbar extent', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.on('zoomAll', function() { });
  this.on('uploadData', function() { });
  this.on('exportGeoJSON', function() { });
  this.on('deleteAllFeatures', function() { });

  this.render(hbs`{{control/subbar-extent}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(),
    '|Zoom|All|Import|Features|Export|Features|Delete|All|'
  );

  // Template block usage:
  this.render(hbs`
    {{#control/subbar-extent}}
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
