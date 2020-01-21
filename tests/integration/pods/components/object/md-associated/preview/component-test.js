import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md associated/preview', function(hooks) {
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
                "date": "2018-01-30T12:00:00.000Z",
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

    await render(hbs`{{object/md-associated/preview item=model class="testme"}}`);

    assert.equal(find('.testme').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|30th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');

    // Template block usage:
    await render(hbs`
      {{#object/md-associated/preview item=model class="testme"}}
        template block text
      {{/object/md-associated/preview}}
    `);

    assert.equal(find('.testme').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|30th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');
  });
});
