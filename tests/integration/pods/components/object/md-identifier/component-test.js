import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createIdentifier from 'mdeditor/tests/helpers/create-identifier';

module('Integration | Component | object/md identifier', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('id', createIdentifier(1)[0]);

    await render(hbs`{{object/md-identifier model=id profilePath="foobar"}}`);

    assert.equal(find('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), 'Identifier|Namespace|namespace0|×|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|');

    assert.equal(find('input').value, 'identifier0', 'assign value');
    // Template block usage:
    await render(hbs`
      {{#object/md-identifier profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-identifier}}
    `);

    assert.equal(find('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(),
      "Identifier|This|field|can't|be|blank|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|template|block|text|",
      'block');
  });
});
