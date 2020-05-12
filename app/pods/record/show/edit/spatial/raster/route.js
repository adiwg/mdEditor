import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    this.set('rasterId', params.raster_id);

    return this.setupModel();
  },

  breadCrumb: computed('rasterId', function () {
    return {
      title: 'RASTER ' + this.rasterId,
      linkable: true
    };
  }),

  setupController: function () {
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('rasterId', this.rasterId)
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let rasterId = this.rasterId;
    let model = this.modelFor('record.show.edit');
    let rasterArray = model.get(
      'json.metadata.resourceInfo.coverageDescription');
    let raster = rasterId && isArray(rasterArray)
      ? rasterArray.get(rasterId)
      : undefined;

    if (isEmpty(raster)) {
      this.flashMessages
        .warning('No Raster Description found! Re-directing...');
      this.replaceWith('record.show.edit.spatial');

      return
    }

    return raster;
  }
});
