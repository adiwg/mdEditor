import Model from 'mdeditor/models/pouch-base';
import { belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class PouchRecordModel extends Model {
  @belongsTo('record') record;

  @alias('json.metadata.resourceInfo.citation.title') title;

  @alias('json.metadata.resourceInfo.resourceType.firstObject.type') defaultType;

  @alias('json.metadata.metadataInfo.metadataIdentifier.identifier') recordId;
}