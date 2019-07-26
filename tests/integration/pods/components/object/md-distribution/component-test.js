import { find, render } from '@ember/test-helpers';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createRecord from 'mdeditor/tests/helpers/create-record';

module('Integration | Component | object/md distribution', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('record', createRecord(1)[0]);

    await render(hbs`{{object/md-distribution model=record profilePath="foobar"}}`);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|distribution|sections|found.|Add|Distribution|Section|');

    this.record.json.metadata.resourceDistribution.push({
      "description": "description",
      "liabilityStatement": "liabilityStatement",
      "distributor": [{
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
        }
      }, {
        "contact": {
          "role": "role",
          "party": [{
            "contactId": "individualId0"
          }]
        }
      }]
    });

    // Template block usage:
    await render(hbs`
      {{#object/md-distribution model=record profilePath="foobar"}}
        template block text
      {{/object/md-distribution}}
    `);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Distribution|Section|#0|Delete|Section|Description|Liablity|Statement|Distributors|role|(|)|role|(|)|Edit|Distributors|',
      'block and list');
  });

  skip('call actions', async function(assert) {
    assert.expect(1);
  });
});
