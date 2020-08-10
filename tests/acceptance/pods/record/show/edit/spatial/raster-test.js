import { module, test, todo  } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { createRecord, createCoverageDescription } from 'mdeditor/tests/helpers/create-record';
import { lsClean } from 'mdeditor/tests/helpers/md-helpers';


module('Acceptance | raster view', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store')
    let json = createRecord(1)[0]
    let coverageDescription = createCoverageDescription(2)
    json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
    this.record = store.createRecord('record', json)
    console.log(this.record)
    this.record.save().then(function () {
      this.record.notifyPropertyChange('currentHash')
    })
  });

  hooks.afterEach(function () {
    lsClean()
  });

  // need to figure out why the Promise is being rejected when asserting the currentURL
  // is equal to asyny helper
  todo('visiting raster page', async function(assert) {


    await visit(`/record/${this.record.id}/edit/spatial/raster/1`)
    await this.pauseTest()
    assert.equal(currentURL(), `/record/${this.record.id}/edit/spatial/raster/1`);
    debugger;
  });
});
