import Route from '@ember/routing/route';
import { get, computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  model(params) {
    this.set('entityId', params.entity_id);

    return this.setupModel();
  },

  breadCrumb: computed('entityId', function () {
    return {
      title: get(this, 'entityId')
    };
  }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('setupModel', get(this, 'setupModel'));
    this.controller.set('entityId', get(this, 'entityId'));
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let entityId = get(this, 'entityId');
    let model = this.modelFor('dictionary.show.edit');
    let objects = model.get('json.dataDictionary.entity');
    let resource = entityId && isArray(objects) ? objects.objectAt(entityId) :
      undefined;

    //make sure the entity exists
    if(isEmpty(resource)) {
      get(this, 'flashMessages')
        .warning('No Entity object found! Re-directing to list...');
      this.replaceWith('dictionary.show.edit.entity');

      return;
    }

    return resource;
  }
});
