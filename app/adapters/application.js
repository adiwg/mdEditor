import classic from 'ember-classic-decorator';
import Adapter from 'ember-local-storage/adapters/adapter';
import { v4 } from 'uuid';

@classic
export default class Application extends Adapter {
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
