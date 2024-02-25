import Model from 'mdeditor/models/pouch-base';
import { belongsTo } from '@ember-data/model';

export default class PouchDictionaryModel extends Model {
  @belongsTo('dictionary') dictionary;
}
