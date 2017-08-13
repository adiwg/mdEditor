import Ember from 'ember';

const {
  Route,
  get,
  isEmpty,
  isArray,
  computed
} = Ember;

export default Route.extend({
  breadCrumb: computed('resourceId', function () {
    return {
      title: get(this, 'resourceId'),
      linkable: true
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
    this.controller.set('resourceId', get(this, 'resourceId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel
      });
  },

  setupModel() {
    let resourceId = get(this, 'resourceId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.associatedResource');
    let resource = resourceId && isArray(objects) ? objects.objectAt(resourceId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(resource)) {
      Ember.get(this, 'flashMessages')
        .warning('No Associated Resource object found! Re-directing to list...');
      this.replaceWith('record.show.edit.associated');

      return;
    }

    return resource;
  }
});
