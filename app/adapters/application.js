import Adapter from 'ember-local-storage/adapters/adapter';
import { mdObjectSize } from 'mdeditor/utils/md-object-size';
import { inject as service } from '@ember/service';

export default Adapter.extend({

  flashMessages: service(),

  updateRecord(store, type, snapshot) {
    let snapshotRecord = mdObjectSize(this.serialize(snapshot, { includeId: true }));
    let snapshotType = mdObjectSize(snapshot.modelName);
    let localStorageSize = mdObjectSize(window.localStorage);
    let diff = ((snapshotRecord - snapshotType) + localStorageSize).toFixed(2);

    if(diff < 5000) {
      return this._super.apply(this, [store, type, snapshot])
    } else {
      let errorMessage = 'Warning! You have exceeded your local storage capacity.  Your recent activity will not be saved.'

      this.flashMessages.danger(`${errorMessage}`, {timeout: 15000, preventDuplicates: true, onDestroy(){} })

      let error = new Error(errorMessage);
      error.isAdapterError = true;
      error.code = 'InvalidError';
      error.errors = [];

      throw error;
    }
  }
});

//timestamp updates
// let date = new Date();
//snapshot.record.set('dateUpdated', date.toISOString());
