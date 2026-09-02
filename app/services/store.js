import Store, { CacheHandler } from '@ember-data/store';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import {
  LegacyNetworkHandler,
  adapterFor,
  serializerFor,
  pushPayload,
  normalize,
  serializeRecord,
} from '@ember-data/legacy-compat';
import {
  buildSchema,
  instantiateRecord,
  teardownRecord,
} from '@ember-data/model';
import JSONAPICache from '@ember-data/json-api';
import { getOwner } from '@ember/application';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import { singularize } from 'ember-inflector';

// ember-data 5.8's `ENABLE_LEGACY_REQUEST_METHODS` compat layer replaces
// `store.modelFor(type)` with a shim (`ShimModelClass`) whose own
// `.attributes`/`.relationshipsObject` getters call back into
// `store.schema.fields(...)`. But `@ember-data/model`'s `buildSchema()`
// schema provider *also* calls `store.modelFor(type)` internally to get the
// real Model class's `.attributes`/`.relationshipsObject` - so the two
// "legacy compat" layers recurse into each other infinitely the first time
// any model's schema is resolved. Patch `_loadModelSchema` to resolve the
// real Model class straight from the owner instead of through the shimmed
// `store.modelFor()`.
function patchSchemaService(schema, store) {
  schema._loadModelSchema = function (type) {
    const modelClass = getOwner(store).factoryFor(`model:${type}`).class;
    const attributeMap = modelClass.attributes;
    const attributes = Object.create(null);
    attributeMap.forEach((meta, name) => (attributes[name] = meta));
    const relationships = modelClass.relationshipsObject || null;
    const fields = new Map();
    for (const attr of Object.values(attributes)) {
      fields.set(attr.name, attr);
    }
    for (const rel of Object.values(relationships)) {
      fields.set(rel.name, rel);
    }
    const internalSchema = {
      schema: {
        legacy: true,
        identity: { name: 'id', kind: '@id' },
        type,
        fields: Array.from(fields.values()),
      },
      attributes,
      relationships,
      fields,
    };
    this._schemas.set(type, internalSchema);
    return internalSchema;
  };
  return schema;
}

const exportSelected = function (store, types, options) {
  // merge defaults
  options = {
    json: true,
    download: false,
    filename: 'ember-data.json',
    filterIds: null,
    ...(options || {}),
  };

  let json, data;
  let filter =
    typeof options.filterIds === 'object' ? options.filterIds : null;

  // collect data
  data = types.reduce(
    (records, type) => {
      const adapter = store.adapterFor(singularize(type));
      const url = adapter.buildURL(type),
        exportData = adapter._handleGETRequest(url);

      records.data = records.data.concat(
        exportData.filter(
          (itm) => filter[singularize(type)].indexOf(itm.id) !== -1
        )
      );
      return records;
    },
    {
      data: [],
    }
  );

  if (options.json || options.download) {
    json = JSON.stringify(data);
  }

  if (options.json) {
    data = json;
  }

  if (options.download) {
    window.saveAs(
      new Blob([json], {
        type: 'application/json;charset=utf-8',
      }),
      options.filename
    );
  }

  return new Promise(
    (resolve) => {
      run(null, resolve, data);
    },
    'DS: LocalStorageAdapter#exportData'
  );
};

export default class ExtendedStoreService extends Store {
  requestManager = new RequestManager()
    .use([LegacyNetworkHandler, Fetch])
    .useCache(CacheHandler);

  exportSelectedData(types, options) {
    return exportSelected(this, types, options);
  }

  adapterFor(...args) {
    return adapterFor.call(this, ...args);
  }

  serializerFor(...args) {
    return serializerFor.call(this, ...args);
  }

  pushPayload(...args) {
    return pushPayload.call(this, ...args);
  }

  normalize(...args) {
    return normalize.call(this, ...args);
  }

  serializeRecord(...args) {
    return serializeRecord.call(this, ...args);
  }

  createSchemaService() {
    return patchSchemaService(buildSchema(this), this);
  }

  createCache(storeWrapper) {
    return new JSONAPICache(storeWrapper);
  }

  instantiateRecord(...args) {
    return instantiateRecord.call(this, ...args);
  }

  teardownRecord(...args) {
    return teardownRecord.call(this, ...args);
  }
}
