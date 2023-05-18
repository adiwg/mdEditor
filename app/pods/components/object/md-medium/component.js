import Component from '@ember/component';
import { getWithDefault, get, set } from '@ember/object';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(function() {
      set(model, 'mediumSpecification', (model.mediumSpecification === undefined ? {} : model.mediumSpecification));
      set(model, 'identifier', (model.identifier === undefined ? {} : model.identifier));
      set(model, 'mediumFormat', (model.mediumFormat === undefined ? [] : model.mediumFormat));
    });
  },
  tagName: 'form',

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  title: alias('model.mediumSpecification.title')
});
