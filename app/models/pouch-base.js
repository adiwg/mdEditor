import { attr } from '@ember-data/model';
import { Model } from 'ember-pouch';

export default class PouchBaseModel extends Model {
  @attr json;
}