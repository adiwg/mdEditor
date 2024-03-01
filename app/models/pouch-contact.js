import Model from 'mdeditor/models/pouch-base';
import { computed } from '@ember/object';

export default class PouchContactModel extends Model {
  @computed('json.{name,positionName,isOrganization}')
  get title() {
    return this.json.name || (this.json.isOrganization ? null : this.json.positionName);
  }
}
