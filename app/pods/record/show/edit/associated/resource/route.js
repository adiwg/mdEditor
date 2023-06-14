import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed, get } from '@ember/object';

export default Route.extend({
  breadCrumb: computed('resourceId', function () {
    return {
      title: this.resourceId,
      linkable: true,
    };
  }),

  model(params) {
    this.set('resourceId', params.resource_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('resourceId', this.resourceId);
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  },

  setupModel() {
    let resourceId = this.resourceId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.associatedResource');
    let resource =
      resourceId && isArray(objects) ? objects.objectAt(resourceId) : undefined;

    //make sure the identifier exists
    if (isEmpty(resource)) {
      this.flashMessages.warning(
        'No Associated Resource object found! Re-directing to list...'
      );
      this.replaceWith('record.show.edit.associated');

      return;
    }

    return resource;
  },
});
