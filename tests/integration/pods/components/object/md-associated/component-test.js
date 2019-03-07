import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md associated', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      "associationType": "product",
      "resourceCitation": {
        "title": "Pacific Connectivity Website",
        "date": [{
          "date": "2015-09-30T04:00:00.000Z",
          "dateType": "publication"
        }],
        "identifier": [{
          "authority": {
            "date": [{
                "date": "2018-01-30T19:09:24.029Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }
            ],
            "title": "ScienceBase"
          },
          "identifier": "5a70c2dee4b0a9a2e9dafbe7",
          "namespace": "gov.sciencebase.catalog",
          "description": "Identifier imported from ScienceBase during publication"
        }]
      },
      "metadataCitation": {
        "title": "Metadata for Pacific Connectivity Website",
        "responsibleParty": [{
          "party": [{
            "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
          }],
          "role": "author"
        }],
        "identifier": [{
          "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
          "namespace": "urn:uuid"
        }]
      },
      "resourceType": [{
          "type": "website"
        },
        {
          "type": "product"
        }
      ]
    });

    await render(hbs`{{object/md-associated profilePath="foobar" model=model}}`);

    assert.equal(find('form').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|Metadata|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|');

    // Template block usage:
    await render(hbs`
      {{#object/md-associated profilePath="foobar" model=model}}
        template block text
      {{/object/md-associated}}
    `);

    assert.equal(find('form').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|Metadata|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|template|block|text|',
      'block');
  });
});
