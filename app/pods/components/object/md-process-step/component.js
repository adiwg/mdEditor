import Component from '@ember/component';
import EmberObject, {
  getWithDefault,
  get,
  set
} from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
  init() {
    this._super(...arguments);

    let model = this.model;

    once(this, function() {
      set(model, 'timePeriod', (model.timePeriod === undefined ? {} : model.timePeriod));
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function() {
      set(model, 'stepId', (model.stepId === undefined ? this.itemId : model.stepId));
      set(model, 'timePeriod', (model.timePeriod === undefined ? {} : model.timePeriod));
      set(model, 'scope', (model.scope === undefined ? {} : model.scope));
      set(model, 'reference', (model.reference === undefined ? [] : model.reference));
      set(model, 'processor', (model.processor === undefined ? [] : model.processor));
      set(model, 'stepSource', (model.stepSource === undefined ? [] : model.stepSource));
      set(model, 'stepProduct', (model.stepProduct === undefined ? [] : model.stepProduct));
    });
  },

  tagName: 'form',

  /**
   * The string representing the path in the profile object for the processStep.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the processStep.
   *
   * @property model
   * @type {Object}
   * @required
   */

  sourceTemplate: EmberObject.extend()
});
