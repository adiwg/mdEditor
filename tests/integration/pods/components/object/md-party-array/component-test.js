import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';

module('Integration | Component | object/md party array', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.party = [
      {
        role: 'author',
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
      {
        role: 'publisher',
        party: [
          {
            contactId: 1,
          },
        ],
      },
    ];

    var contacts = createContact(2);
    var cs = this.owner.lookup('service:contacts');

    cs.set('contacts', contacts);

    await render(
      hbs`{{object/md-party-array value=party profilePath="foobar"}}`
    );

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|2|Add|#|Role|Contacts|0|author|?|×|×|Contact0|Delete|1|publisher|?|×|×|Contact1|Delete|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-party-array model=(hash) profilePath="foobar"}}
        template block text
      {{/object/md-party-array}}
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Add|#|Role|Contacts|Add|',
      'block'
    );
  });
});
