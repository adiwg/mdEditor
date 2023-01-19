import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { A } from '@ember/array';

export default Route.extend(ScrollTo, {
  model(params) {
    let rparams = this.paramsFor('record.show.edit.spatial.raster');

    this.set('attrGroupId', params.attrgroup_id);
    this.set('attributeId', params.attribute_id);
    this.set('rasterId', rparams.raster_id);

    return this.setupModel();
  },

  // breadCrumb: computed('distributionId', function () {
  //   return {
  //     title: this.distributionId
  //     //title: `${get(this, 'distributionId')}: Distributors`
  //   };
  // }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('attrGroupId', this.attrGroupId);
    this.controller.set('attributeId', this.attributeId);
    this.controller.set('rasterId', this.rasterId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let rasterId = this.rasterId;
    let attrGroupId = this.attrGroupId;
    let attributeId = this.attributeId;
    let model = this.modelFor('record.show.edit');

    let rasters = model.get('json.metadata.resourceInfo.coverageDescription');

    let raster = rasterId && isArray(rasters)
      ? A(rasters).objectAt(rasterId)
      : undefined;
    let attrGroup = raster && attrGroupId && isArray(raster.attributeGroup)
      ? A(raster.attributeGroup).objectAt(attrGroupId)
      : undefined;
    let attribute = attrGroup && attributeId && isArray(attrGroup.attribute)
      ? A(attrGroup.attribute).objectAt(attributeId)
      : undefined;
    //make sure the identifier exists
    if(isEmpty(attribute)) {
      this.flashMessages
        .warning('No Attributes found! Re-directing to Attribute Groups...');
      this.replaceWith('record.show.edit.spatial.raster');

      return;
    }

    return attribute;
  },

  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    },

    deleteAttribute(id) {
      let model = this.controller.parentModel
        .get('json.metadata.resourceInfo.coverageDescription')[this.controller.rasterId]
        .attributeGroup[this.controller.attrGroupId].attribute;

      model.removeAt(id || parseInt(this.attributeId, 0));
      this.transitionTo('record.show.edit.spatial.raster', {
        queryParams: {
          scrollTo: this.controller.attrGroupId
        }
      });
    },

    backToAttrGroup() {
      this.transitionTo('record.show.edit.spatial.raster');
    }
  }
});
