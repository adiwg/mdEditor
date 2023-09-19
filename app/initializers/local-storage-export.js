import Store from '@ember-data/store';
import { Promise } from 'rsvp';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import { singularize } from 'ember-inflector';

const exportSelected = function(store, types, options) {
  // merge defaults
  options = {
    json: true,
    download: false,
    filename: 'ember-data.json',
    filterIds: null,
    ...options || {}
  }

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

  return new Promise((resolve) => {
    run(null, resolve, data);
  }, 'DS: LocalStorageAdapter#exportData');
};

export function initialize() {
  Store.reopen({
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
