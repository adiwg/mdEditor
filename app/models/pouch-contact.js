import Model from 'mdeditor/models/pouch-base';
import { belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class PouchContactModel extends Model {
  @service contacts;

  @belongsTo('contact') contact;

  @computed('json.{name,positionName,isOrganization}')
  get title() {
    return this.json.name || (this.json.isOrganization ? null : this.json.positionName);
  }

  @computed('json.memberOfOrganization.[]')
  get defaultOrganization() {
    const { memberOfOrganization } = this.json;

    return !isEmpty(memberOfOrganization) ? memberOfOrganization[0] : null;
  }

  @alias('json.electronicMailAddress.firstObject') email;

  @alias('json.contactId') contactId;
}
