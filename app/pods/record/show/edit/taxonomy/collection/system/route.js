import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { get } from '@ember/object';

export default Route.extend({
  model(params, transition) {
    this.set('systemId', params.system_id);
    this.set('collectionId', transition.params[
      'record.show.edit.taxonomy.collection'].collection_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let systemId = get(this, 'systemId');
    let collectionId = get(this, 'collectionId');
    let model = this.modelFor('record.show.edit');
    let systems = model.get(
      'json.metadata.resourceInfo.taxonomy.' + collectionId + '.taxonomicSystem');
    let system = systemId && isArray(systems) ? systems.get(
      systemId) : undefined;

    //make sure the identifier exists
    if(isEmpty(system)) {
      get(this, 'flashMessages')
        .warning('No Taxonomic System found! Re-directing...');
      this.replaceWith('record.show.edit.taxonomy.collection');

      return;
    }

    return system;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    }
  }
});
