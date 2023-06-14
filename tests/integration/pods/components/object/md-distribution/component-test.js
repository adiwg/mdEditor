import { find, render } from '@ember/test-helpers';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md distribution', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      description: 'description',
      liabilityStatement: 'liabilityStatement',
      distributor: [
        {
          contact: {
            role: 'role',
            roleExtent: [
              {
                temporalExtent: [
                  {
                    timePeriod: {
                      startDateTime: '2016-10-24T11:10:15.2-10:00',
                    },
                  },
                ],
              },
            ],
            party: [
              {
                contactId: 'individualId0',
              },
            ],
          },
        },
        {
          contact: {
            role: 'role',
            party: [
              {
                contactId: 'individualId0',
              },
            ],
          },
        },
      ],
    });

    await render(
      hbs`{{object/md-distribution model=model profilePath="foobar"}}`
    );

    assert.equal(
      find('section')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Distribution|#|Delete|Description|Liablity|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|)|More...|Delete|1|role|(|)|More...|Delete|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-distribution model=model profilePath="foobar"}}
        template block text
      {{/object/md-distribution}}
    `);

    assert.equal(
      find('section')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Distribution|#|Delete|Description|Liablity|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|)|More...|Delete|1|role|(|)|More...|Delete|',
      'block and list'
    );
  });

  skip('call actions', async function (assert) {
    assert.expect(1);
  });
});
