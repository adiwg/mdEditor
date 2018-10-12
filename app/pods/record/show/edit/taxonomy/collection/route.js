import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { get } from '@ember/object';
import NativeArray from '@ember/array';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  model(params) {
    this.set('collectionId', params.collection_id);

    return this.setupModel();
  },

  breadCrumb: computed('collectionId', function () {
    return {
      title: 'Collection'
      //title: `${get(this, 'collectionId')}: Distributors`
    };
  }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('collectionId', get(this, 'collectionId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let collectionId = get(this, 'collectionId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceInfo.taxonomy');
    let resource = collectionId && isArray(objects) ? NativeArray.apply(objects).objectAt(collectionId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(resource)) {
      get(this, 'flashMessages')
        .warning('No Collection object found! Re-directing to list...');
      this.replaceWith('record.show.edit.taxonomy');

      return;
    }

    return resource;
  }
});
