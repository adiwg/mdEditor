import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createCitation from 'mdeditor/tests/helpers/create-citation';

module('Integration | Component | object/md keyword citation', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('keyword', {
      keywordType: 'theme',
      thesaurus: createCitation(1)[0]
    });

    await render(hbs`{{object/md-keyword-citation model=keyword}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Title|Date|Date|Type|Choose|date|type|Type|theme|?|keyword|identifies|a|particular|subject|or|topic|Edition|URL|');

    var input = findAll('form input').mapBy('value').join('|');

    assert.equal(input, "title0|2016-10-13|edition|http://adiwg.org", 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-keyword-citation model=(hash thesaurus=(hash))}}
        template block text
      {{/object/md-keyword-citation}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Title|This|field|can't|be|blank|Date|Date|Type|Choose|date|type|Type|Choose|keyword|type|Edition|URL|",
      'block');
  });
});
