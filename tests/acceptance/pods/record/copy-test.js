import { module, /*test, */ skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  createRecord,
  createCoverageDescription
} from 'mdeditor/tests/helpers/create-record';
import createContact from 'mdeditor/tests/helpers/create-contact';
import { lsClean } from 'mdeditor/tests/helpers/md-helpers';


module('Acceptance | raster view', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    lsClean();
  });

  skip('visiting /raster', async function(assert) {
    let json = createRecord(1)[0]

    let contact = createContact(2)
    json.json.contact = contact
    let coverageDescription = createCoverageDescription(1);
    json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
    let store = this.owner.lookup('service:store')
    let record = store.createRecord('record', json)
    record.save()

    await visit(`/record/${record.id}/edit`);

    assert.equal(currentURL(), `/record/${record.id}/edit`)
  })

  // need to figure out why the Promise is being rejected when asserting the currentURL
  // is equal to asyny helper
  // skip('visiting raster page', async function(assert) {
  //     let store = this.owner.lookup('service:store');
  //     let json = createRecord(1)[0];
  //     let coverageDescription = createCoverageDescription(1);
  //     json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
  //     let record = store.createRecord('record', json);
  //     record.save();

  //   await visit(`/record/${record.id}/edit`);
  //   assert.equal(currentURL(), `/record/${record.id}/edit`);
  // });
});
