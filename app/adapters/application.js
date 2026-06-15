import LocalAdapter from 'ember-local-storage/adapters/local';
import classic from 'ember-classic-decorator';
import { v4 } from 'uuid';

@classic
export default class ApplicationAdapter extends LocalAdapter {
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
  }
}
