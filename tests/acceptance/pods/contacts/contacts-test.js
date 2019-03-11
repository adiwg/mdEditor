import { module, test } from 'qunit';
import { find, visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/contacts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /contacts', async function(assert) {
    await visit('/contacts');

    assert.equal(currentURL(), '/contacts');
  });

  test('delete should display a confirm', async function(assert) {
    assert.expect(1);

    var store = this.owner.lookup('service:store');

    //make sure there's at least one record visible
    store.createRecord('contact');
    await visit('/contacts');
    await click('button.md-button-confirm.btn-danger');
    assert.equal(find('button.md-button-confirm.btn-danger').innerText.trim(), 'Confirm');
  });
});
