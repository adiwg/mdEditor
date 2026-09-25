import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { inject as service } from '@ember/service';

export default class EditRoute extends Route {
  @service router;
  @service flashMessages;

  get breadCrumb() {
    return {
      title: this.dataQualityId,
      linkable: true,
    };
  }

  model(params) {
    this.set('dataQualityId', params.data_quality_id);

    return this.setupModel();
  }
  setupController() {
    super.setupController(...arguments);

    this.controller.set('dataQualityId', this.dataQualityId);
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }
  setupModel() {
    let dataQualityId = this.dataQualityId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.dataQuality');
    let dataQuality =
      dataQualityId && isArray(objects)
        ? objects.get(dataQualityId)
        : undefined;

    if (isEmpty(dataQuality)) {
      this.flashMessages.warning(
        'No Data Quality object found! Re-directing to list...'
      );
      this.router.replaceWith('record.show.edit.dataquality');

      return;
    }

    return dataQuality;
  }
}
