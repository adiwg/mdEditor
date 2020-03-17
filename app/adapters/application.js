import Adapter from 'ember-local-storage/adapters/adapter';
import { inject as service } from '@ember/service';
import mdCalcStorage from 'mdeditor/utils/md-calc-storage';

export default Adapter.extend({

  storageMonitor: service(),

  updateRecord(store, type, snapshot) {
    // calculate current snapshot data and local storage size
    let snapshotData = mdCalcStorage(this.serialize(snapshot, {includeId: true}))
    let snapshotType = mdCalcStorage(snapshot.modelName)
    let localStorageSize = mdCalcStorage(localStorage)

    //get difference between snapshot and local storage
    let diff = ((snapshotData - snapshotType) + localStorageSize).toFixed(2)

    //only save updates if calculated storage is under 5000 kb
    if (diff < 5000) {
      return this._super.apply(this, [store, type, snapshot]);
      //timestamp updates
      //let date = new Date();
      //snapshot.record.set('dateUpdated', date.toISOString());
    }
  }
});
