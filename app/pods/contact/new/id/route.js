import Ember from 'ember';
import DS from 'ember-data';

const {
  AdapterError
} = DS;

export default Ember.Route.extend({
  /**
   * The route model
   *
   * @method model
   * @param {Object} params
   * @chainable
   * @return {Object}
   */
  model: function(params) {
    let record = this.store.peekRecord('contact', params.contact_id);

    if (record) {
      return record;
    }

    return this.store.findRecord('contact', params.contact_id);
  },

  /**
   * The breadcrumb title string.
   *
   * @property breadCrumb
   * @type {String}
   * @default null
   */
  breadCrumb: null,

  /**
   * Called when route is deactivated.
   * The model is destroyed if still "new".
   *
   * @method deactivate
   */
  deactivate: function() {
    // We grab the model loaded in this route
    var model = this.currentModel;

    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model && model.get('isNew')) {
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord();
    }
  },

  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    // // setup tests for required attributes
    // controller.noId = Ember.computed('model.json.contactId', function () {
    //   return model.get('json.contactId') ? false : true;
    // });
    // controller.noName = Ember.computed('model.json.individualName',
    //   'model.json.organizationName',
    //   function () {
    //     let haveIndividual = model.get('json.individualName') ? true :
    //       false;
    //     let haveOrganization = model.get('json.organizationName') ?
    //       true : false;
    //     return !(haveIndividual || haveOrganization);
    //   });
    // controller.allowSave = Ember.computed('noId', 'noName', function () {
    //   return(this.get('noName') || this.get('noId'));
    // });
  },

  // serialize: function (model) {
  //   // If we got here without an ID (and therefore without a model)
  //   // Ensure that we leave the route param in the URL blank (not 'undefined')
  //   if(!model) {
  //     return {
  //       contact_id: ''
  //     };
  //   }
  //
  //   // Otherwise, let Ember handle it as usual
  //   return this._super.apply(this, arguments);
  // },

  actions: {
    willTransition: function(transition) {
      if (transition.targetName === 'contact.new.index') {
        transition.abort();
        return true;
      }

      // We grab the model loaded in this route
      var model = this.currentModel;
      // If we are leaving the Route we verify if the model is in
      // 'isNew' state, which means it wasn't saved to the backend.
      if (model && model.get('isNew')) {
        let contexts = transition.intent.contexts;
        // We call DS#destroyRecord() which removes it from the store
        model.destroyRecord();
        transition.abort();

        if (contexts.length > 0) {
          //grab any models ids and apply them to transition
          let ids = contexts.mapBy('id');
          this.replaceWith(transition.targetName, ...ids);
          return true;
        }

        this.replaceWith(transition.targetName);
        return true;
      }
    },

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
    },

    error(error) {
      if (error instanceof AdapterError) {
        Ember.get(this, 'flashMessages')
          .warning('No contact found! Re-directing to new contact...');
        // redirect to new
        this.replaceWith('contact.new');
      } else {
        // otherwise let the error bubble
        return true;
      }
    }
  }
});
