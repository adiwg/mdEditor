import Model, { attr } from '@ember-data/model';

export default class ThesaurusModel extends Model {
  @attr('string') label;
  @attr('string') keywordType;
  @attr('string') keywordsUrl;
  @attr('json') citation;
  @attr({ defaultValue: () => [] }) keywords;
}
