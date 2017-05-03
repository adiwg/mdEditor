import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    // if (!params.record_id) {
    //   return this.store.createRecord('record');
    // }

    return this.store.findRecord('record', params.record_id);
  },

  breadCrumb: null,

  deactivate: function () {
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
  setupController: function (controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    // setup tests for required attributes
    controller.noTitle = Ember.computed(
      'model.json.metadata.resourceInfo.citation.title',
      function () {
        return model.get('title') ? false : true;
      });
    controller.noType = Ember.computed(
      'model.json.metadata.resourceInfo.resourceType',
      function () {
        return model.get('json.metadata.resourceInfo.resourceType') ? false : true;
      });
    controller.allowSave = Ember.computed('noType', 'noTitle', function () {
      return (this.get('noTitle') || this.get('noType'));
    });
  },

  // serialize: function (model) {
  //   // If we got here without an ID (and therefore without a model)
  //   // Ensure that we leave the route param in the URL blank (not 'undefined')
  //   if (!model) {
  //     let rec=this.store.createRecord('record');
  //     return {
  //       record_id: rec.id
  //     };
  //   }
  //
  //   // Otherwise, let Ember handle it as usual
  //   return this._super.apply(this, arguments);
  // },

  actions: {
    willTransition: function (transition) {
      if (transition.targetName === 'record.new.index') {
          this.currentRouteModel().destroyRecord();
          return true;
      }
    },
    saveRecord() {
      this.currentRouteModel()
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
