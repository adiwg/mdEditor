import Model from 'mdeditor/models/pouch-base';
import { belongsTo } from '@ember-data/model';

export default class PouchRecordModel extends Model {
  @belongsTo('record') record;
}