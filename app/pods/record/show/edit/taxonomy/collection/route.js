import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  model(params) {
    this.set('collectionId', params.collection_id);

    return this.setupModel();
  },

  breadCrumb: computed('collectionId', function () {
    let index = this.collectionId;

    return {
      title: `Collection ${index > 0 ? index : ''}`
      //title: `${get(this, 'collectionId')}: Distributors`
    };
  }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('collectionId', this.collectionId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let collectionId = this.collectionId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceInfo.taxonomy');
    let resource = collectionId && isArray(objects) ? A(objects).objectAt(collectionId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(resource)) {
      this.flashMessages
        .warning('No Collection object found! Re-directing to list...');
      this.replaceWith('record.show.edit.taxonomy');

      return;
    }

    return resource;
  }
});
