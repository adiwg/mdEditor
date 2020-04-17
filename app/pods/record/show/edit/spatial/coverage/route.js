import Route from '@ember/routing/route';
import { computed } from "@ember/object";
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  model(params) {
    this.set('coverageId', params.coverage_id)

    return this.setupModel();
  },

  breadCrumb: computed('coverageId', function () {
    return{
      title: 'Coverage ' + this.coverageId,
      linkable: true
    };
  }),

  setupController: function () {
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('coverageId', this.coverageId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let coverageId = this.coverageId
    let model = this.modelFor('record.show.edit');
    let coverageArray = model.get(
      'json.metadata.resourceInfo.coverageDescription');
    let coverage = coverageId && isArray(coverageArray)
      ? coverageArray.get(coverageId)
      : undefined;

    // making sure the coverage exists
    if(isEmpty(coverage)) {
      this.flashMessages
        .warning('No Coverage Description Found! Re-directing...');
      this.replaceWith('record.show.edit.spatial');

      return;
    }

    return coverage;
  },

  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    }
  }
});
