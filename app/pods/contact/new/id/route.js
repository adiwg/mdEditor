import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    if(!params.contact_id) {
      return this.store.createRecord('contact');
    }

    return this.store.findRecord('contact', params.contact_id);
  },

  deactivate: function () {
    // We grab the model loaded in this route
    var model = this.currentModel;

    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if(model && model.get('isNew')) {
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord();
    }
  },

  //some test actions
  setupController: function (controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    // setup tests for required attributes
    controller.noId = Ember.computed('model.json.contactId', function () {
      return model.get('json.contactId') ? false : true;
    });
    controller.noName = Ember.computed('model.json.individualName',
      'model.json.organizationName',
      function () {
        let haveIndividual = model.get('json.individualName') ? true :
          false;
        let haveOrganization = model.get('json.organizationName') ?
          true : false;
        return !(haveIndividual || haveOrganization);
      });
    controller.allowSave = Ember.computed('noId', 'noName', function () {
      return(this.get('noName') || this.get('noId'));
    });
  },

  serialize: function (model) {
    // If we got here without an ID (and therefore without a model)
    // Ensure that we leave the route param in the URL blank (not 'undefined')
    if(!model) {
      return {
        contact_id: ''
      };
    }

    // Otherwise, let Ember handle it as usual
    return this._super.apply(this, arguments);
  },

  actions: {
    saveContact() {
      this.currentModel
        .save()
        .then((model) => {
          this.replaceWith('contact.show.edit', model);
        });
    },

    cancelContact() {
      this.replaceWith('contacts');

      return false;
    }
  }
});
