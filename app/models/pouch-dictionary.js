import Model from 'mdeditor/models/pouch-base';
import { alias } from '@ember/object/computed';

export default class PouchDictionaryModel extends Model {
  @alias('json.dataDictionary.citation.title') title;

  @alias('json.dictionaryId') dictionaryId;
}
