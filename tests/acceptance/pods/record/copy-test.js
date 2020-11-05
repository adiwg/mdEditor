import {
  module,
  test
} from 'qunit';
import {
  findAll,
  visit,
  currentURL,
  click
} from '@ember/test-helpers';
import {
  setupApplicationTest
} from 'ember-qunit';
import { createRecord } from 'mdeditor/tests/helpers/create-record';

module('Acceptance | pods/record copy', function (hooks) {
  setupApplicationTest(hooks);

  test('create and copy record', async function (assert) {
    assert.expect(2);

    var store = this.owner.lookup('service:store');

    //make sure there's at least one record visible
    var record = store.createRecord('record', createRecord(1)[0]);
    //await visit('/records/');
    //await click('button.md-button-.btn-danger');
    await visit('/record/' + record.id);
    //await settled();
    assert.equal(currentURL(), '/record/' + record.id);
    await click('.md-crud-buttons .btn-info');
    assert.equal(findAll('.md-input-input input')[0].value, 'Copy of My Record0', 'created copy');

    //change route to prevent error during teardown
    await visit('/');
  });
});
