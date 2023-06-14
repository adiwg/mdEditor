import Component from '@ember/component';
import { Template } from '../md-party/component';

export default Component.extend({
  attributeBindings: ['data-spy'],

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: Template,
});
