import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('dictionary');
  },

  deactivate: function() {
    // We grab the model loaded in this route
    let model = this.modelFor('dictionary/new');

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
    controller.noName = Ember.computed(
      'model.json.dictionaryInfo.citation.title', function() {
        return model.get('title') ? false : true;
      });
    controller.noType = Ember.computed(
      'model.json.dictionaryInfo.resourceType', function() {
        return model.get('json.dictionaryInfo.resourceType') ? false : true;
      });
  },

  actions: {
    saveDictionary() {
      let haveName = !this.controller.get('noName');
      let haveType = !this.controller.get('noType');
      if (haveName && haveType) {
        this.modelFor('dictionary.new')
          .save()
          .then((model) => {
            this.transitionTo('dictionary.show.edit', model);
          });
      }

      return false;
    },

    cancelDictionary() {
      this.transitionTo('dictionaries');

      return false;
    }
  }

});
