import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export default class SystemRoute extends Route {
  model(params) {
    this.set('systemId', params.system_id);
    this.set('collectionId', this.paramsFor(
      'record.show.edit.taxonomy.collection').collection_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let systemId = this.systemId;
    let collectionId = this.collectionId;
    let model = this.modelFor('record.show.edit');
    let systems = model.get(
      'json.metadata.resourceInfo.taxonomy.' + collectionId + '.taxonomicSystem');
    let system = systemId && isArray(systems) ? systems.get(
      systemId) : undefined;

    //make sure the identifier exists
    if(isEmpty(system)) {
      this.flashMessages
        .warning('No Taxonomic System found! Re-directing...');
      this.replaceWith('record.show.edit.taxonomy.collection');

      return;
    }

    return system;
  }
    parentModel() {
      return this.modelFor('record.show.edit');
    }
}