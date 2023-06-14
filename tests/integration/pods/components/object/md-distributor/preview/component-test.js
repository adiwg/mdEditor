import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';

module(
  'Integration | Component | object/md distributor/preview',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');

      this.set('contacts', this.owner.lookup('service:contacts'));

      store.createRecord('contact', createContact(1)[0]);

      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
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
              contactId: 0,
            },
          ],
        },
        orderProcess: [
          {
            fees: '1.00USD',
          },
          {
            fees: '2.00USD',
          },
        ],
        transferOption: [
          {
            transferSize: 9.9,
          },
          {
            transferSize: 10.9,
          },
        ],
      });

      await render(hbs`{{object/md-distributor/preview item=distributor}}`);

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|role|(|Contact0|)|'
      );

      // Template block usage:
      await render(hbs`
      {{#object/md-distributor/preview class="testme" item=distributor}}
        template block text
      {{/object/md-distributor/preview}}
    `);

      assert.equal(
        find('.testme')
          .textContent.replace(/[\s\n]+/g, '|')
          .trim(),
        '|role|(|Contact0|)|template|block|text|'
      );
    });
  }
);
