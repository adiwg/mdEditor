import Model from 'mdeditor/models/pouch-base';
import { alias } from '@ember/object/computed';

export default class PouchRecordModel extends Model {
  @alias('json.metadata.resourceInfo.citation.title') title;

  @alias('json.metadata.resourceInfo.resourceType.firstObject.type') defaultType;

  @alias('json.metadata.metadataInfo.metadataIdentifier.identifier') recordId;
}