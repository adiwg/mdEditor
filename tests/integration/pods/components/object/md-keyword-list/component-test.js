import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('object/md-keyword-list',
  'Integration | Component | object/md keyword list', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  this.set('model', {
    'keyword': [{
      'identifier': 'id1',
      'keyword': 'foo1',
      'path': ['foo1']
    }, {
      'identifier': 'id2',
      'keyword': 'bar1',
      'path': ['foo1', 'bar1']
    }]
  });
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{object/md-keyword-list model=model}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(), '|Delete|foo1|Delete|bar1|');

  this.render(hbs `{{object/md-keyword-list model=model readOnly=false}}`);

  assert.equal(this.$('tr').length, 4, 'Check number of rows.');
  assert.equal(this.$('input').length, 4, 'Check number of input el.');
  assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
  assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|', 'readOnly = false.');

  // Template block usage:
  this.render(hbs `
    {{#object/md-keyword-list}}
      template block text
    {{/object/md-keyword-list}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
});
