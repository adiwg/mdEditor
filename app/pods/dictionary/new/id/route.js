import { computed } from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function (params) {
    // if(!params.dictionary_id) {
    //   return this.store.createRecord('dictionary');
    // }

    return this.store.findRecord('dictionary', params.dictionary_id);
  },

  breadCrumb: null,

  deactivate: function() {
    // We grab the model loaded in this route
    let model = this.currentRouteModel();

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
    controller.noName = computed(
      'model.json.dataDictionary.citation.title', function() {
        return model.get('json.dataDictionary.citation.title') ? false : true;
      });
    controller.noType = computed(
      'model.json.dataDictionary.resourceType', function() {
        return model.get('json.dataDictionary.resourceType') ? false : true;
      });
    controller.allowSave = computed('noType', 'noName', function () {
      return this.noName || this.noType;
    });

  },

  // serialize: function (model) {
  //   // If we got here without an ID (and therefore without a model)
  //   // Ensure that we leave the route param in the URL blank (not 'undefined')
  //   if(!model) {
  //     return {
  //       dictionary_id: ''
  //     };
  //   }
  //
  //   // Otherwise, let Ember handle it as usual
  //   return this._super.apply(this, arguments);
  // },

  actions: {
    willTransition: function (transition) {
      if (transition.targetName === 'dictionary.new.index') {
          this.currentRouteModel().destroyRecord();
          return true;
      }
    },

    saveDictionary() {
      this.currentRouteModel()
        .save()
        .then((model) => {
          this.replaceWith('dictionary.show.edit', model);
        });
    },

    cancelDictionary() {
      this.replaceWith('dictionaries');

      return false;
    }
  }

});
