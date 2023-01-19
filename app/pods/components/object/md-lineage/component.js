import Component from '@ember/component';
import EmberObject, {
  getWithDefault,
  get,
  set
} from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(function() {
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(model, 'citation', getWithDefault(model, 'citation', []));
      set(model, 'processStep', getWithDefault(model, 'processStep', []));
      set(model, 'source', getWithDefault(model, 'source', []));
    });
  },

  tagName: 'form',

  /**
   * The string representing the path in the profile object for the citation.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the citation.
   *
   * @property model
   * @type {Object}
   * @required
   */

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property stepTemplateClass
   * @type Ember.Object
   */
  stepTemplateClass: EmberObject.extend({
    init() {
      this._super(...arguments);
      this.set('timePeriod', {});
    }
  }),

  sourceTemplate: EmberObject.extend()
});
