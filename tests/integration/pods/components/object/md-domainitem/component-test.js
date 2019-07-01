import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md domainitem', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('item', {
      "name": "name0",
      "value": "value0",
      "definition": "definition0",
      "reference": {
        "title": "domainReference"
      }
    });

    await render(hbs`{{object/md-domainitem profilePath="foobar" model=item}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|Value|Definition|Item|Reference|Content|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|');

    // Template block usage:
    await render(hbs`
      {{#object/md-domainitem profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-domainitem}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
    "|Name|Value|Definition|Item|Reference|Content|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|",
    'block');
  });
});
