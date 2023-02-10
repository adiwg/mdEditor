import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed, get } from '@ember/object';

export default Route.extend({
  breadCrumb: computed('dataQualityId', function () {
    return {
      title: get(this, 'dataQualityId'),
      linkable: true
    };
  }),

  model(params) {
    this.set('dataQualityId', params.data_quality_id);

    return this.setupModel();
  },

  setupController: function () {
    this._super(...arguments);

    this.controller.set('dataQualityId', get(this, 'dataQualityId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let dataQualityId = get(this, 'dataQualityId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.dataQuality');
    let dataQuality = dataQualityId && isArray(objects) ? objects.get(dataQualityId) : undefined;

    if(isEmpty(dataQuality)) {
      get(this, 'flashMessages')
        .warning('No Data Quality object found! Re-directing to list...');
      this.replaceWith('record.show.edit.dataquality');

      return;
    }

    return dataQuality;
  }
})
