import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed, get } from '@ember/object';

export default Route.extend({
  breadCrumb: computed('acquisitionId', function () {
    return {
      title: get(this, 'acquisitionId'),
      linkable: true,
    };
  }),

  model(params) {
    this.set('acquisitionId', params.acquisition_id);

    return this.setupModel();
  },

  setupController: function () {
    this._super(...arguments);

    this.controller.set('acquisitionId', get(this, 'acquisitionId'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  },

  setupModel() {
    let acquisitionId = get(this, 'acquisitionId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.acquisition');
    let acquisition =
      acquisitionId && isArray(objects)
        ? objects.get(acquisitionId)
        : undefined;

    if (isEmpty(acquisition)) {
      get(this, 'flashMessages').warning(
        'No Acquisition object found! Re-directing to list...'
      );
      this.replaceWith('record.show.edit.acquisition');

      return;
    }

    return acquisition;
  },
});
