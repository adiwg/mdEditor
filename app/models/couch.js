import Model, { attr } from '@ember-data/model';

export default class CouchModel extends Model {
  @attr('string') remoteUrl;
  @attr('string') remoteName;
}
