import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('record');
  },

  deactivate: function() {
    // We grab the model loaded in this route
    let model = this.currentModel;

    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model && model.get('isNew')) {
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
    controller.allowSave = Ember.computed('noType', 'noTitle', function () {
      return (this.get('noTitle') || this.get('noType'));
    });
  },

  actions: {
    saveRecord() {
      this.currentModel
        .save()
        .then((model) => {
          this.replaceWith('record.show.edit', model);
        });
    },

    cancelRecord() {
      this.replaceWith('records');

      return false;
    }
  }

});
