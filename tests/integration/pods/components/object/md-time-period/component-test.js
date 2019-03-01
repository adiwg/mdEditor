import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md time period', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = [{
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": [
          "periodName0",
          "periodName1"
        ],
        "startDateTime": "2016-10-14T11:10:15.2-10:00",
        "endDateTime": "2016-12-31",
        "timeInterval": {
          "interval": 9,
          "units": "year"
        },
        "duration": {
          "years": 1,
          "months": 1,
          "days": 1,
          "hours": 1,
          "minutes": 1,
          "seconds": 1
        }
      },
      {
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": [
          "periodName0",
          "periodName1"
        ],
        "startGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        },
        "endGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        }
      }
    ];

    await render(hbs`{{object/md-time-period profilePath="foobar" model=model.firstObject}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|');


    var input = findAll('form input, form textarea').mapBy('value').join('|');

    assert.equal(input, '2016-10-14 14:10:15|2016-12-31 00:00:00|id|description|periodName0|periodName1|9|1|1|1|1|1|1', 'input values');

    await render(hbs`{{object/md-time-period profilePath="foobar" model=model.lastObject}}`);

    var input1 = findAll('form input, form textarea').mapBy('value').join('|');

    assert.equal(input1, "||id|description|periodName0|periodName1|||||||", 'geologic input values');

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Time|Period|Dates|Start|Date|This|field|can't|be|blank|End|Date|This|field|can't|be|blank|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|This|field|can't|be|blank|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|",
      'geologic age');
    // Template block usage:
    await render(hbs`
      {{#object/md-time-period profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-time-period}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Time|Period|Dates|Start|Date|This|field|can't|be|blank|End|Date|This|field|can't|be|blank|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|This|field|can't|be|blank|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|",
      'block');
  });
});
