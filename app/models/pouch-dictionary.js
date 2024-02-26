import Model from 'mdeditor/models/pouch-base';
import { belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class PouchDictionaryModel extends Model {
  @belongsTo('dictionary') dictionary;

  @alias('json.dataDictionary.citation.title') title;

  @alias('json.dictionaryId') dictionaryId;
}
