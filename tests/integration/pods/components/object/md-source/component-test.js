import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md source', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.source = {
      "description": "description",
      "sourceCitation": {
        "title": "title"
      },
      "metadataCitation": [{
          "title": "title0"
        },
        {
          "title": "title1"
        }
      ],
      "spatialResolution": {
        "measure": {
          "type": "distance",
          "value": 99.9,
          "unitOfMeasure": "unitOfMeasure"
        }
      },
      "referenceSystem": {
        "referenceSystemType": "referenceSystemType",
        "referenceSystemIdentifier": {
          "identifier": "identifier"
        }
      },
      "sourceProcessStep": [{
          "description": "description0"
        },
        {
          "description": "description1"
        }
      ]
    };

    await render(hbs`{{object/md-source profilePath="foobar" model=source}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      'Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Metadata|Citation|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|OK|Spatial|Reference|System|Reference|System|Type|referenceSystemType|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|distance|Value|Units|');

    // Template block usage:
    await render(hbs`
      {{#object/md-source profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-source}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Metadata|Citation|0|Add|OK|#|Title|Add|Citation|OK|Spatial|Reference|System|Reference|System|Type|Select|type|of|reference|system|used.|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|",
      'block');
  });
});
