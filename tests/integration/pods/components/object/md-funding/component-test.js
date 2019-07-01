import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md funding', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('funding', {
      "allocation": [{
        "amount": 9.9,
        "currency": "currency"
      }]
    }, {
      "timePeriod": {
        "endDateTime": "2016-12-31"
      }
    });


    await render(hbs`{{object/md-funding model=funding}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Disbursement|1|Add|OK|#|Amount|Currency|Matching|0|9.9|currency|Not|Defined|Edit|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|");

    // Template block usage:
    await render(hbs`
      {{#object/md-funding model=(hash)}}
        template block text
      {{/object/md-funding}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Disbursement|0|Add|OK|#|Amount|Currency|Matching|Add|Disbursement|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|",
      'block');
  });
});
