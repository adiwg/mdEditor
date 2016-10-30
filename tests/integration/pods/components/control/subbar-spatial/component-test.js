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
    .trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|');

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
    '|Zoom|All|Import|Features|Export|Features|Delete|All|template|block|text|'
  );
});
