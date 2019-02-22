import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';

module('Integration | Component | object/md process step', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    var contacts = createContact(2);
    var cs = this.owner.lookup('service:contacts');

    cs.set('contacts', contacts);
    //
    this.step = {
      "stepId": "stepId",
      "description": "description",
      "rationale": "rationale",
      "timePeriod": {
        "startDateTime": "2016-10-15"
      },
      "processor": [{
          "role": "role",
          "party": [{
            "contactId": "0"
          }]
        },
        {
          "role": "role",
          "party": [{
            "contactId": "1"
          }]
        }
      ],
      "stepSource": [{
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
      }],
      "stepProduct": [{
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
      }],
      "reference": [{
          "title": "title0"
        },
        {
          "title": "title1"
        }
      ]
    };



    await render(hbs`{{object/md-process-step profilePath="foobar" model=step}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|OK|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|This|field|can't|be|blank|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|");

    // Template block usage:
    await render(hbs`
      {{#object/md-process-step profilePath="foobar" model=step}}
        template block text
      {{/object/md-process-step}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
    "|Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|OK|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|This|field|can't|be|blank|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|template|block|text|",
    'block');
  });
});
