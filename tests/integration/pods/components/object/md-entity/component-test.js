import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { createDictionary } from 'mdeditor/tests/helpers/create-dictionary';

module('Integration | Component | object/md entity', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('dictionary', createDictionary(1)[0].json.dataDictionary);
    this.set('entity', this.dictionary.entity[0]);

    await render(hbs`{{object/md-entity dictionary=dictionary profilePath="foobar" model=entity}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|Aliases|2|Add|Alias|0|Delete|1|Delete|Attributes|3|Add|OK|#|Attribute|Name|Data|Type|Definition|Allow|Null?|0|dataType0|×|More...|Delete|1|dataType1|×|More...|Delete|2|dataType2|×|More...|Delete|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|×|primaryKeyAttributeCodeName0-0|×|primaryKeyAttributeCodeName1-0|Foreign|Keys|1|Add|Foreign|Key|#|Local|Attributes|Referenced|Entity|Referenced|Attributes|0|×|attributeCommonName0-0|referencedEntityCodeName00|×|×|referencedAttributeCodeName0-0|Delete|Entity|Indices|1|Add|#|Name|Attributes|Duplicates?|0|×|attributeCodeName0-0|?|Delete|No|Entity|Reference|found.|Add|Entity|Reference|');

    assert.dom('.md-indicator-related').isVisible({ count: 2 });

    // Template block usage:
    await render(hbs`
      {{#object/md-entity dictionary=(hash) profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-entity}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
    '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|No|Alias|found.|Add|Alias|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|No|Foreign|Key|found.|Add|Foreign|Key|No|Entity|Index|found.|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|',
    'block');
  });
});
