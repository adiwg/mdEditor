import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md maintenance', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.model = {
      "frequency": "frequency",
      "date": [{
          "date": "2016-10-12",
          "dateType": "creation"
        },
        {
          "date": "2016-10-12",
          "dateType": "publication"
        }
      ],
      "scope": [{
          "scopeCode": "scopeCode0"
        },
        {
          "scopeCode": "scopeCode1"
        }
      ],
      "note": [
        "note0",
        "note1"
      ],
      "contact": [{
          "role": "author",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        },
        {
          "role": "publisher",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId1"
          }]
        }
      ]
    };

    await render(hbs`{{object/md-maintenance profilePath="foobar" model=model}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Frequency|frequency|×|Dates|2|Add|Date|#|Date|Date|Type|Description|0|creation|?|date|identifies|when|the|resource|was|brought|into|existence|×|Delete|1|publication|?|date|identifies|when|the|resource|was|issued|×|Delete|Contacts|2|Add|Contact|#|Role|Contacts|0|author|?|party|who|authored|the|resource|×|Delete|1|publisher|?|party|who|published|the|resource|×|Delete|Notes|2|Add|Notes|0|Delete|1|Delete|Scope|×|scopeCode0|×|scopeCode1|');

    // Template block usage:
    await render(hbs`
      {{#object/md-maintenance profilePath="foobar"}}
        template block text
      {{/object/md-maintenance}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Frequency|Choose|a|value.|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Contacts|0|Add|Contact|#|Role|Contacts|Add|Contact|Notes|0|Add|Notes|Add|Notes|Scope|template|block|text|',
      'block');
  });
});
