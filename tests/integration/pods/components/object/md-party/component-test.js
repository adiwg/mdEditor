import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';

module('Integration | Component | object/md party', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.party = {
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
    };

    var contacts = createContact(2);
    var cs = this.owner.lookup('service:contacts');

    cs.set('contacts', contacts);

    await render(hbs`{{object/md-party model=party}}`);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Role|author|?|×|Contacts|×|Contact0|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-party model=(hash)}}
        template block text
      {{/object/md-party}}
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Role|Select|or|enter|a|role|Contacts|',
      'block'
    );
  });
});
