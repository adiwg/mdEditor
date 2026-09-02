import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md time period', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    var date = new Date("2016-10-14T13:10:15-0800");

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
        "startDateTime": date,
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

    await render(hbs`{{object/md-time-period profilePath="foobar" model=(get this.model "0")}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|');


    var input = findAll('form input, form textarea').mapBy('value').join('|');

    assert.equal(input, '2016|2016|identifier|description|periodName0|periodName1|9|1|1|1|1|1|1', 'input values');

    await render(hbs`{{object/md-time-period profilePath="foobar" model=this.model.lastObject}}`);

    var input1 = findAll('form input, form textarea').mapBy('value').join('|');

    assert.equal(input1, "||identifier|description|periodName0|periodName1|||||||", 'geologic input values');

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|",
      'geologic age');
    // Template block usage:
    await render(hbs`
      <Object::MdTimePeriod @profilePath="foobar" @model={{(hash)}}>
        template block text
      </Object::MdTimePeriod>
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|',
      'block');
  });
});
