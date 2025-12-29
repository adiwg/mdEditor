import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, get, action } from '@ember/object';

@classic
@tagName('form')
export default class MdSpatialInfo extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      set(model, 'spatialReferenceSystem', getWithDefault(model, 'spatialReferenceSystem', []));
      set(model, 'spatialRepresentationType', getWithDefault(model, 'spatialRepresentationType', []));
      set(model, 'spatialResolution', getWithDefault(model, 'spatialResolution', []));
      set(model, 'coverageDescription', getWithDefault(model, 'coverageDescription', []));
    });
  }

  @service
  router;

  @action
  editRaster(id) {
    this.router.transitionTo('record.show.edit.spatial.raster', this.parentModel, id);
  }
}
