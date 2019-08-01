import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createDictionary from 'mdeditor/tests/helpers/create-dictionary';

module('Integration | Component | object/md entity', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('dictionary', createDictionary(1)[0]);
    this.set('entity', {
      "entityId": "entityId",
      "commonName": "commonName",
      "codeName": "codeName",
      "alias": [
        "alias0",
        "alias1"
      ],
      "definition": "definition",
      "primaryKeyAttributeCodeName": [
        "primaryKeyAttributeCodeName0",
        "primaryKeyAttributeCodeName1"
      ],
      "index": [],
      "attribute": [],
      "foreignKey": []
    }, {
      "entityId": "",
      "commonName": "",
      "codeName": "",
      "alias": [
        ""
      ],
      "definition": "",
      "entityReference": [{
        "title": "entityReference"
      }],
      "primaryKeyAttributeCodeName": [
        ""
      ],
      "index": [{
        "codeName": "",
        "allowDuplicates": false,
        "attributeCodeName": [
          ""
        ]
      }],
      "attribute": [{
        "commonName": "",
        "codeName": "",
        "alias": [
          ""
        ],
        "definition": "",
        "dataType": "",
        "allowNull": true,
        "units": "",
        "domainId": "",
        "minValue": "",
        "maxValue": ""
      }],
      "foreignKey": [{
        "localAttributeCodeName": [
          ""
        ],
        "referencedEntityCodeName": "",
        "referencedAttributeCodeName": [
          ""
        ]
      }],
      "fieldSeparatorCharacter": ",",
      "numberOfHeaderLines": 9,
      "quoteCharacter": "\""
    });


    await render(hbs`{{object/md-entity dictionary=dictionary profilePath="foobar" model=entity}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|Aliases|2|Add|Alias|0|Delete|1|Delete|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|×|primaryKeyAttributeCodeName0|×|primaryKeyAttributeCodeName1|No|Foreign|Key|Attributes|found.|Add|Foreign|Key|Attribute|No|Entity|Index|found.|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|');

    // Template block usage:
    await render(hbs`
      {{#object/md-entity dictionary=(hash) profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-entity}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
    '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|No|Alias|found.|Add|Alias|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|No|Foreign|Key|Attributes|found.|Add|Foreign|Key|Attribute|No|Entity|Index|found.|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|',
    'block');
  });
});
