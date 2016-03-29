import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('record');
  },

  deactivate: function() {
    // We grab the model loaded in this route
    let model = this.modelFor('record/new');

    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model.get('isNew')) {
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord();
    }
  },

  //some test actions
  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    // setup tests for required attributes
    controller.noTitle = Ember.computed(
      'model.json.metadata.resourceInfo.citation.title', function() {
        return model.get('title') ? false : true;
      });
    controller.noType = Ember.computed(
      'model.json.metadata.resourceInfo.resourceType', function() {
        return model.get('json.metadata.resourceInfo.resourceType') ? false : true;
      });
  },

  actions: {
    saveRecord() {
      let haveTitle = !this.controller.get('noTitle');
      let haveType = !this.controller.get('noType');
      if (haveTitle && haveType) {
        this.modelFor('record.new')
          .save()
          .then((model) => {
            this.transitionTo('record.show.edit', model);
          });
      }

      return false;
    },

    cancelRecord() {
      this.transitionTo('records');

      return false;
    }
  }

});
