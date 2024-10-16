import Component from '@ember/component';
import { get, set } from '@ember/object';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(function () {
      set(
        model,
        'mediumSpecification',
        get(model, 'mediumSpecification') !== undefined
          ? get(model, 'mediumSpecification')
          : {},
      );
      set(
        model,
        'identifier',
        get(model, 'identifier') !== undefined ? get(model, 'identifier') : {},
      );
      set(
        model,
        'mediumFormat',
        get(model, 'mediumFormat') !== undefined
          ? get(model, 'mediumFormat')
          : [],
      );
    });
  },
  tagName: 'form',

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  title: alias('model.mediumSpecification.title'),
});
