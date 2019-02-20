import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createCitation from 'mdeditor/tests/helpers/create-citation';

module('Integration | Component | object/md citation array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('citation', createCitation(3));

    await render(hbs`{{object/md-citation-array}}`);

    assert.equal(find('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');

    await render(hbs`{{object/md-citation-array model=citation}}`);

    assert.equal(find('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Citation|3|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|2|title2|More...|Delete|OK|',
      'renders rows');

    // Template block usage:
    await render(hbs`
      {{#object/md-citation-array}}
        template block text
      {{/object/md-citation-array}}
    `);

    assert.equal(find('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
  });
});
