import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md transfer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = {
      "unitsOfDistribution": "unitsOfDistribution",
      "transferSize": 9.9,
      "onlineOption": [{
          "uri": "http://adiwg.org"
        },
        {
          "uri": "http://adiwg.org/"
        }
      ],
      "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        },
        {
          "mediumSpecification": {
            "title": "title1"
          }
        }
      ],
      "transferFrequency": {
        "months": 9
      },
      "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        },
        {
          "formatSpecification": {
            "title": "title1"
          }
        }
      ]
    };

    await render(hbs`{{object/md-transfer profilePath="foobar" model=model}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Transfer|Size|(MB)|Distribution|units|Online|Option|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://adiwg.org/|Edit|Delete|Offline|Option|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Distribution|Formats|2|Add|#|Format|Name|Version|Compression|Method|URL|0|Delete|1|Delete|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|');

    var input = findAll('form input').mapBy('value').join('|');

    assert.equal(input, "9.9|unitsOfDistribution|title0||||title1|||||9||||", 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-transfer profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-transfer}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Transfer|Size|(MB)|Distribution|units|No|Online|Option|found.|Add|Online|Option|No|Offline|Option|found.|Add|Offline|Option|No|Distribution|Format|found.|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|',
      'block');
  });
});
