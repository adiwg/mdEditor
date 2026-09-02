import {
  module,
  test
} from 'qunit';
import {
  find,
  visit,
  currentURL,
  click
} from '@ember/test-helpers';
import {
  setupApplicationTest
} from 'ember-qunit';

module('Acceptance | pods/contacts', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /contacts', async function (assert) {
    await visit('/contacts');

    assert.equal(currentURL(), '/contacts');
  });

  test('delete should display a confirm', async function (assert) {
    assert.expect(1);

    var store = this.owner.lookup('service:store');

    //make sure there's at least one record visible as a loaded record
    store.push({
      data: {
        id: 'test-contact-1',
        type: 'contact',
        attributes: {
          json: {
            contactId: 'test-contact-1',
            name: 'Test Contact',
            isOrganization: false
          },
          dateUpdated: new Date().toISOString()
        }
      }
    });
    await visit('/contacts');

    // Scope to the per-row delete button specifically -- the bulk
    // "Delete Selected" filter-row button (also .md-button-confirm.btn-danger)
    // can appear once a row is selected, which happens here as a side effect
    // of the click bubbling to the row (classic component event dispatch
    // doesn't stop propagation to the row's native {{on "click"}} listener
    // the same way it would for another classic-dispatched handler).
    const rowDeleteButton = 'tbody button.md-button-confirm.btn-danger';
    await click(rowDeleteButton);
    assert.equal(find(rowDeleteButton).innerText
      .trim(), 'Confirm');
  });
});
