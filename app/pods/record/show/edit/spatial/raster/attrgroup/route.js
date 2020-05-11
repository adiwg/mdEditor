import Route from '@ember/routing/route';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';

export default Route.extend({
  model(params) {
    this.set('rasterId', params.raster_id);
    this.set('attrGrpId', params.attrgrp_id);

    return this.setupModel();
  },

  // breadCrumb: computed('attrGrpId', function () {
  //   return {
  //     title: 'ATTRIBUTE GROUP ' + this.attrGrpId,
  //     linkable: true
  //   };
  // }),

  setupController: function () {
    this._super(...arguments);

    this.controller.set('rasterId', this.rasterId)
    this.controller.set('attrGrpId', this.attrGrpId);
    this.controller.set('parentModel', this.modelFor('record.show.edit'));

    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let rasterId = this.rasterId;
    let attrGrpId = this.attrGrpId;
    let model = this.modelFor('record.show.edit');

    let objects = model.get(
      'json.metadata.resourceInfo.coverageDescription');

    let raster = rasterId && isArray(objects)
    ? A(objects).objectAt(rasterId)
    : undefined;

    let attrGrp = attrGrpId && isArray(raster.attrGrp)
      ? A(raster.attriGrp).objectAt(attrGrpId)
      : undefined;

      // make sure the raster exists
      if (isEmpty(attrGrp)) {
        this.flashMessages
          .warning('No Attribute Group Found! Re-directing...');
        this.replaceWith('record.show.edit.spatial.coverageDescription');

        return;
      }

    return attrGrp;
  },

  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    }
  }

});
