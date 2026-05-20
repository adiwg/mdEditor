import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createCitation from 'mdeditor/tests/helpers/create-citation';

module('Integration | Component | object/md documentation/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('doc', {
      resourceType: [{
        "type": "foo",
        "name": "bar"
      }],
      citation: createCitation(2)
    });
    await render(hbs`{{object/md-documentation/preview item=doc}}`);

    assert.equal(find('.text-muted').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|');

    // Template block usage:
    await render(hbs`
      <Object::MdDocumentation::Preview @class="testme" @item={{doc}}>
        template block text
      </Object::MdDocumentation::Preview>
    `);

    assert.equal(find('.testme').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|',
      'block');
  });
});
