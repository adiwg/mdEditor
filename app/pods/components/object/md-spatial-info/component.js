import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(
        model,
        'spatialReferenceSystem',
        get(model, 'spatialReferenceSystem') !== undefined
          ? get(model, 'spatialReferenceSystem')
          : [],
      );
      set(
        model,
        'spatialRepresentationType',
        get(model, 'spatialRepresentationType') !== undefined
          ? get(model, 'spatialRepresentationType')
          : [],
      );
      set(
        model,
        'spatialResolution',
        get(model, 'spatialResolution') !== undefined
          ? get(model, 'spatialResolution')
          : [],
      );
      set(
        model,
        'coverageDescription',
        get(model, 'coverageDescription') !== undefined
          ? get(model, 'coverageDescription')
          : [],
      );
    });
  },

  router: service(),

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

  tagName: 'form',

  actions: {
    editRaster(id) {
      this.router.transitionTo(
        'record.show.edit.spatial.raster',
        this.parentModel,
        id,
      );
    },
  },
});
