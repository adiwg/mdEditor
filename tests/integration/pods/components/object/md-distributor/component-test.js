import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md distributor', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('distributor', {
      "contact": {
        "role": "role",
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
      "orderProcess": [{
          "fees": "1.00USD"
        },
        {
          "fees": "2.00USD"
        }
      ],
      "transferOption": [{
          "transferSize": 9.9
        },
        {
          "transferSize": 10.9
        }
      ]
    });


    await render(hbs`{{object/md-distributor model=distributor profilePath="foobar"}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|Transfer|Size|(MB)|Distribution|units|Online|Option|0|Add|OK|#|Name|Uri|Add|Resource|OK|Offline|Option|0|Add|OK|#|Title|Add|Offline|Option|OK|Distribution|Formats|0|Add|#|Format|Name|Version|Compression|Method|URL|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|');

    // Template block usage:
    await render(hbs`
      {{#object/md-distributor model=distributor profilePath="foobar"}}
        template block text
      {{/object/md-distributor}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Contacts|Role|role|×|Transfer|Options|Transfer|Size|(MB)|Distribution|units|Online|Option|0|Add|OK|#|Name|Uri|Add|Resource|OK|Offline|Option|0|Add|OK|#|Title|Add|Offline|Option|OK|Distribution|Formats|0|Add|#|Format|Name|Version|Compression|Method|URL|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|template|block|text|',
      'block'
    );
  });
});
