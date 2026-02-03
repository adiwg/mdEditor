import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { once } from '@ember/runloop';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

@classic
export default class MdSpatialInfoComponent extends Component {
  @service router;

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

  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      model.spatialReferenceSystem = model.spatialReferenceSystem ?? [];
      model.spatialRepresentationType = model.spatialRepresentationType ?? [];
      model.spatialResolution = model.spatialResolution ?? [];
      model.coverageDescription = model.coverageDescription ?? [];
    });
  }

  @action
  editRaster(id) {
    this.router.transitionTo('record.show.edit.spatial.raster', this.parentModel, id);
  }
}
