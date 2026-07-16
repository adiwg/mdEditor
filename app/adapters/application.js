import LocalAdapter from 'ember-local-storage/adapters/local';
import { v4 } from 'uuid';

export default LocalAdapter.extend({
  shouldReloadAll() {
    return false;
  },
  shouldReloadRecord() {
    return false;
  },
  shouldBackgroundReloadAll() {
    return false;
  },
  shouldBackgroundReloadRecord() {
    return false;
  },

  generateIdForRecord(store, type, inputProperties) {
    if (inputProperties.id) {
      return inputProperties.id;
    }
    if (!inputProperties.uuid) {
      let uuid = v4();
      let shortId = uuid.split('-')[0];
      inputProperties.uuid = uuid;
      return shortId;
    }
    return inputProperties.uuid.split('-')[0];
  },
});
