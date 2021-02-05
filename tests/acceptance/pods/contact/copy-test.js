import { module, test } from 'qunit';
import { findAll, visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import createContact from 'mdeditor/tests/helpers/create-contact';

module('Acceptance | pods/contact copy', function (hooks) {
  setupApplicationTest(hooks);

  test('create and copy record', async function (assert) {
    assert.expect(2);

    var store = this.owner.lookup('service:store');

    //make sure there's at least one record visible
    var contact = store.createRecord('contact', createContact(1)[0]);
    //await visit('/contacts/');
    //await click('button.md-button-.btn-danger');
    await visit('/contact/' + contact.id);
    //await settled();
    assert.equal(currentURL(), '/contact/' + contact.id);
    await click('.md-crud-buttons .btn-info');
    assert.equal(
      findAll('.md-input-input input')[1].value,
      'Copy of Contact0',
      'created copy'
    );

    //change route to prevent error during teardown
    await visit('/');
  });
});
