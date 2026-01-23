import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export default class RasterRoute extends Route {
  @service flashMessages;
  model(params) {
    this.set('rasterId', params.raster_id);

    return this.setupModel();
  }
  get breadCrumb() {
    return {
      title: 'RASTER ' + this.rasterId,
      linkable: true
    };
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('rasterId', this.rasterId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let rasterId = this.rasterId;
    let model = this.modelFor('record.show.edit');
    let rasters = model.get(
      'json.metadata.resourceInfo.coverageDescription');
    let raster = rasterId && isArray(rasters)
      ? rasters.get(rasterId)
      : undefined;

    //make sure the raster exists
    if(isEmpty(raster)) {
      this.flashMessages
        .warning('No Raster Description found! Re-directing...');
      this.replaceWith('record.show.edit.spatial');

      return;
    }

    return raster;
  }
    parentModel() {
      return this.modelFor('record.show.edit');
    }
}