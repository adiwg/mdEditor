import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ProfileModel extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('boolean', { defaultValue: false }) isCustom;

  @belongsTo('profile-definition', { async: true }) definition;
  @hasMany('schema', { async: true }) schemas;
  @hasMany('thesaurus', { async: true, inverse: null }) thesauri;
}
