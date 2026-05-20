import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createCitation from 'mdeditor/tests/helpers/create-citation';

module('Integration | Component | object/md citation/preview/body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('citation', createCitation(1)[0]);

    await render(hbs`{{object/md-citation/preview/body citation=citation}}`);

    assert.equal(find('.row').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|');

    // Template block usage:
    await render(hbs`
      <Object::MdCitation::Preview::Body>
        template block text
      </Object::MdCitation::Preview::Body>
    `);

    assert.equal(find('.row').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|',
      'block');
  });
});
