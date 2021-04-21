import Route from '@ember/routing/route';
import DS from 'ember-data';

const {
  NotFoundError
} = DS;

export default Route.extend({
  model(params) {
    let record = this.store.peekRecord('record', params.record_id);

    if(record) {
      return record;
    }

    return this.store.findRecord('record', params.record_id);
  },

  breadCrumb: null,

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  //profile: service(),

  deactivate() {
    // We grab the model loaded in this route
    let model = this.currentRouteModel();

    // If we are leaving the Route we verify if the model is in
    // 'isDeleted' state, which means it wasn't saved to the metadata.
    if(model && model.isDeleted) {
      // We call DS#unloadRecord() which removes it from the store
      this.store.unloadRecord(model);
    }
  },

  //some test actions
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
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
    willTransition: function(transition) {
      if(transition.targetName === 'record.new.index') {
        transition.abort();
        return true;
      }

      // We grab the model loaded in this route
      var model = this.currentRouteModel();
      // If we are leaving the Route we verify if the model is in
      // 'isNew' state, which means it wasn't saved to the backend.
      if(model && model.get('isNew')) {
        transition.abort();
        //let contexts = transition.intent.contexts;
        // We call DS#destroyRecord() which removes it from the store
        model.destroyRecord().then(()=>  transition.retry());
        //transition.abort();

        // if(contexts && contexts.length > 0) {
        //   //grab any models ids and apply them to transition
        //   let ids = contexts.mapBy('id');
        //   this.replaceWith(transition.targetName, ...ids);
        //   return true;
        // }

        //this.replaceWith(transition.targetName);
        return true;
      }
    },
    saveRecord() {
      this.currentRouteModel()
        .save()
        .then((model) => {
          this.replaceWith('record.show.edit', model);
        }).catch((error) => {
          throw error
        });
    },

    cancelRecord() {
      this.replaceWith('records');

      return false;
    },

    error(error) {
      if(error instanceof NotFoundError) {
        this.flashMessages
          .warning('No record found! Re-directing to new record...');
        // redirect to new
        this.replaceWith('record.new');
      } else {
        // otherwise let the error bubble
        return true;
      }
    },
    // /**
    //  * Update the record profile
    //  *
    //  * @name   updateProfile
    //  * @param  {String} profile The new profile.
    //  */
    // updateProfile(profile) {
    //   this.profile
    //     .set('active', profile);
    // }
  }

});
