import Model, { attr } from '@ember-data/model';

export default class ProfileDefinitionModel extends Model {
  @attr('string') identifier;
  @attr('string') title;
  @attr('string') description;
  @attr('string') namespace;
  @attr('string') version;
  @attr('string') uri;
  @attr('string') alias;
  @attr('boolean', { defaultValue: false }) isCustom;
  @attr('json') components;
  @attr('json') nav;
  @attr('json') config;
}
