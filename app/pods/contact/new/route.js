import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('contact');
  },

  deactivate: function() {
    // We grab the model loaded in this route
    var model = this.modelFor('contact/new');

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
    controller.noId = Ember.computed('model.json.contactId', function() {
      return model.get('json.contactId') ? false : true;
    });
    controller.noName = Ember.computed('model.json.individualName',
      'model.json.organizationName', function() {
        let haveIndividual = model.get('json.individualName') ? true : false;
        let haveOrganization = model.get('json.organizationName') ? true : false;
      return !(haveIndividual || haveOrganization);
    });
    controller.allowSave = Ember.computed('noId', 'noName', function () {
      return (this.get('noName') || this.get('noId'));
    });
  },
  
  actions: {
    saveContact() {
      let haveId = !this.controller.get('noId');
      let haveName = !this.controller.get('noName');
      if (haveId && haveName) {
        this.modelFor('contact.new')
          .save()
          .then((model) => {
            this.transitionTo('contact.show.edit', model);
          });
      }

      return false;
    },

    cancelContact() {
      this.transitionTo('contacts');

      return false;
    }
  }
});
