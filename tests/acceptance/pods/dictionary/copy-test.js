import { module, test } from 'qunit';
import { findAll, visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { createDictionary } from 'mdeditor/tests/helpers/create-dictionary';

module('Acceptance | pods/dictionary copy', function (hooks) {
  setupApplicationTest(hooks);

  test('create and copy record', async function (assert) {
    assert.expect(2);

    var store = this.owner.lookup('service:store');

    //make sure there's at least one record visible
    var dictionary = store.createRecord('dictionary', createDictionary(1)[0]);
    //await visit('/contacts/');
    //await click('button.md-button-.btn-danger');
    await visit('/dictionary/' + dictionary.id);
    //await settled();
    assert.equal(currentURL(), '/dictionary/' + dictionary.id);
    await click('.md-crud-buttons .btn-info');
    assert.equal(findAll('.md-input-input input')[0].value, 'Copy of My Dictionary0', 'created copy');

    //change route to prevent error during teardown
    await visit('/');
  });
});
