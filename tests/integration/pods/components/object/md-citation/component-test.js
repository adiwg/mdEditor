import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createCitation from 'mdeditor/tests/helpers/create-citation';

module('Integration | Component | object/md citation', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('citation', createCitation(1)[0]);

    await render(hbs`{{object/md-citation profilePath="foobar" model=citation}}`);

    assert.equal(find('form').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|OK|');

    // Template block usage:
    await render(hbs`
      {{#object/md-citation profilePath="foobar"}}
        template block text
      {{/object/md-citation}}
    `);

    assert.equal(find('form').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|template|block|text|',
      'block');
  });
});
