import { Adapter } from 'ember-pouch';
import { initDb } from 'mdeditor/adapters/pouch-base';
import { v4 } from 'uuid';
import classic from 'ember-classic-decorator';

@classic
export default class DictionaryAdapter extends Adapter {
  db = initDb();

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
