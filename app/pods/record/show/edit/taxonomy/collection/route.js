import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isArray, A } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default class CollectionRoute extends Route {
  @service flashMessages;
  @service router;
  model(params) {
    this.set('collectionId', params.collection_id);

    return this.setupModel();
  }
  get breadCrumb() {
    let index = this.collectionId;

    return {
      title: `Collection ${index > 0 ? index : ''}`
      //title: `${get(this, 'collectionId')}: Distributors`
    };
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('collectionId', this.collectionId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
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
      this.router.replaceWith('record.show.edit.taxonomy');

      return;
    }

    return resource;
  }
}