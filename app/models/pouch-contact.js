import Model from 'mdeditor/models/pouch-base';
import { belongsTo } from '@ember-data/model';

export default class PouchContactModel extends Model {
  @belongsTo('contact') contact;
}
