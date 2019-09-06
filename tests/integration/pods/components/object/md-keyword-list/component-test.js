import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md keyword list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
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

    await render(hbs `{{object/md-keyword-list model=model profilePath="foobar"}}`);

    assert.equal(find('ul').textContent
      .replace(/[ \n]+/g, '|')
      .trim(), '|Delete|foo1|Delete|bar1|');

    await render(hbs `{{object/md-keyword-list model=model readOnly=false profilePath="foobar"}}`);

    assert.equal(findAll('tr').length, 4, 'Check number of rows.');
    assert.equal(findAll('input').length, 4, 'Check number of input el.');
    assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
    assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
    assert.equal(find('table').textContent
      .replace(/[ \n]+/g, '|')
      .trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|Toggle|Thesaurus|', 'readOnly = false.');

    // Template block usage:
    await render(hbs `<section>
      {{#object/md-keyword-list profilePath="foobar"}}
        template block text
      {{/object/md-keyword-list}}</section>
    `);

    assert.equal(find('section').textContent
      .replace(/[ \n]+/g, '|')
      .trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
  });
});
