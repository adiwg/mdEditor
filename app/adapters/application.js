import Adapter
from 'ember-local-storage/adapters/adapter';

export default Adapter.extend({
  //timestamp updates
  updateRecord(store, type, snapshot) {
    let date = new Date();

    snapshot.record.set('dateUpdated', date);
    return this._super.apply(this,[store, type, snapshot]);
  }
});
