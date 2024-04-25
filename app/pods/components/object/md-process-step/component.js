import Component from '@ember/component';
import EmberObject, { get, set } from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
  init() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(
        model,
        'timePeriod',
        get(model, 'timePeriod') !== undefined ? get(model, 'timePeriod') : {},
      );
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(
        model,
        'stepId',
        get(model, 'stepId') !== undefined ? get(model, 'stepId') : this.itemId,
      );
      set(
        model,
        'timePeriod',
        get(model, 'timePeriod') !== undefined ? get(model, 'timePeriod') : {},
      );
      set(
        model,
        'scope',
        get(model, 'scope') !== undefined ? get(model, 'scope') : {},
      );
      set(
        model,
        'reference',
        get(model, 'reference') !== undefined ? get(model, 'reference') : [],
      );
      set(
        model,
        'processor',
        get(model, 'processor') !== undefined ? get(model, 'processor') : [],
      );
      set(
        model,
        'stepSource',
        get(model, 'stepSource') !== undefined ? get(model, 'stepSource') : [],
      );
      set(
        model,
        'stepProduct',
        get(model, 'stepProduct') !== undefined
          ? get(model, 'stepProduct')
          : [],
      );
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
