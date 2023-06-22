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

    once(this, function () {
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'stepId', getWithDefault(model, 'stepId', this.itemId));
      set(model, 'timePeriod', getWithDefault(model, 'timePeriod', {}));
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(model, 'reference', getWithDefault(model, 'reference', []));
      set(model, 'processor', getWithDefault(model, 'processor', []));
      set(model, 'stepSource', getWithDefault(model, 'stepSource', []));
      set(model, 'stepProduct', getWithDefault(model, 'stepProduct', []));
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

  sourceTemplate: EmberObject.extend(),
});
