import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';

export default Route.extend({
  breadCrumb: computed('acquisitionId', function () {
    return {
      title: this.acquisitionId,
      linkable: true,
    };
  }),

  model(params) {
    this.set('acquisitionId', params.acquisition_id);

    return this.setupModel();
  },

  setupController: function () {
    this._super(...arguments);

    this.controller.set('acquisitionId', this.acquisitionId);
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  },

  setupModel() {
    let acquisitionId = this.acquisitionId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.acquisition');
    let acquisition =
      acquisitionId && isArray(objects)
        ? objects.get(acquisitionId)
        : undefined;

    if (isEmpty(acquisition)) {
      this.flashMessages.warning(
        'No Acquisition object found! Re-directing to list...'
      );
      this.replaceWith('record.show.edit.acquisition');

      return;
    }

    return acquisition;
  },
});
