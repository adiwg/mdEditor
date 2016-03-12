import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-boolean',
  'Integration | Component | input/md boolean', {
    integration: true
  });

test('it renders', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{input/md-boolean value=false text="Foo Bar" label="Baz" }}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#input/md-boolean value=true text="Foo Bar" label="Baz"}}
      template block text
    {{/input/md-boolean}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');

  assert.ok(this.$('input').prop('checked'));
});
