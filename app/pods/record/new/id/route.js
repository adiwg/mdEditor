import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { NotFoundError } from '@ember-data/adapter/error';
import Route from '@ember/routing/route';

@classic
export default class IdRoute extends Route {
  model(params) {
    let record = this.store.peekRecord('record', params.record_id);

    if (record) {
      return record;
    }

    return this.store.findRecord('record', params.record_id);
  }

  breadCrumb = null;

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
    if (model && model.isDeleted) {
      // We call DS#unloadRecord() which removes it from the store
      this.store.unloadRecord(model);
    }
  }

  //some test actions
  setupController(controller, model) {
    // Call _super for default behavior
    super.setupController(controller, model);
  }

  @action
  willTransition(transition) {
    if (transition.targetName === 'record.new.index') {
      transition.abort();
      return true;
    }

    // We grab the model loaded in this route
    var model = this.currentRouteModel();
    // If we are leaving the Route we verify if the model is in
    // 'isNew' state, which means it wasn't saved to the backend.
    if (model && model.get('isNew')) {
      transition.abort();
      //let contexts = transition.intent.contexts;
      // We call DS#destroyRecord() which removes it from the store
      model.destroyRecord().then(() => transition.retry());
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
  }

  @action
  saveRecord() {
    this.currentRouteModel()
      .save()
      .then((model) => {
        this.replaceWith('record.show.edit', model);
      });
  }

  @action
  cancelRecord() {
    this.replaceWith('records');

    return false;
  }

  @action
  error(error) {
    if (error instanceof NotFoundError) {
      this.flashMessages.warning(
        'No record found! Re-directing to new record...'
      );
      // redirect to new
      this.replaceWith('record.new');
    } else {
      // otherwise let the error bubble
      return true;
    }
  }
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