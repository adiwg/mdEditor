import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, get } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function() {
      set(model, 'spatialReferenceSystem', getWithDefault(model, 'spatialReferenceSystem', []));
      set(model, 'spatialRepresentationType', getWithDefault(model, 'spatialRepresentationType', []));
      set(model, 'spatialResolution', getWithDefault(model, 'spatialResolution', []));
    });
  },
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName: 'form'
});
