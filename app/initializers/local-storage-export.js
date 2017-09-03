import Ember from 'ember';
import DS from 'ember-data';

const {
  //assert,
  String: {
    singularize
  },
  run
} = Ember;
const assign = Ember.assign || Ember.merge;
const exportSelected = function(store, types, options) {
  // merge defaults
  options = assign({
    json: true,
    download: false,
    filename: 'ember-data.json',
    filterIds: null
  }, options || {});

  let json, data;
  let filter = typeof options.filterIds === 'object' ? options.filterIds :
    null;

  // collect data
  data = types.reduce((records, type) => {
    const adapter = store.adapterFor(singularize(type));
    const url = adapter.buildURL(type),
      exportData = adapter._handleGETRequest(url);

    records.data = records.data.concat(exportData.filter(itm => filter[
      singularize(type)].indexOf(itm.id) !== -1));
    return records;
  }, {
    data: []
  });

  if(options.json || options.download) {
    json = JSON.stringify(data);
  }

  if(options.json) {
    data = json;
  }

  if(options.download) {
    window.saveAs(
      new Blob([json], {
        type: 'application/json;charset=utf-8'
      }),
      options.filename
    );
  }

  return new Ember.RSVP.Promise((resolve) => {
    run(null, resolve, data);
  }, 'DS: LocalStorageAdapter#exportData');
};

export function initialize() {
  DS.Store.reopen({
    exportSelectedData(types, options) {
      return exportSelected(this, types, options);
    }
  });
}

export default {
  name: 'local-storage-export',
  after: 'ember-data',
  initialize: initialize
};
