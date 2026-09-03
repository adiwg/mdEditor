import { NotFoundError } from '@ember-data/adapter/error';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IdRoute extends Route {
  @service store;
  @service flashMessages;
  async model(params) {
    let record = this.store.peekRecord('record', params.record_id);

    if (record) {
      record.set('recordId', record.get('uuid'));
      return record;
    }

    return this.store.findRecord('record', params.record_id).then((record) => {
      record.set('recordId', record.get('uuid'));
      return record;
    });
  }
  breadCrumb = null;

  @service router;

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
    super.setupController(controller, model);
  }
    willTransition(transition) {
      if (transition.targetName === 'record.new.index') {
        transition.abort();
        return true;
      }

      // A transition we triggered ourselves right after a successful save
      // (see saveRecord() below) - skip the isNew check below entirely.
      // model.isNew is backed by ember-data 5.x's warp-drive RecordState
      // machinery, which can still read as true here even though the save
      // already resolved (same root cause as the "memoSignal is not a
      // function" bug elsewhere in this app - classic Ember .extend()
      // breaks this decorator family). Trusting a stale isNew here was
      // destroying the just-saved record and bouncing back to record.new.
      if (this._justSaved) {
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
          this._justSaved = true;
          this.router.replaceWith('record.show.edit', model);
        });
    }

    @action
    cancelRecord() {
      this.router.replaceWith('records');

      return false;
    }

    error(error) {
      if (error instanceof NotFoundError) {
        this.flashMessages.warning(
          'No record found! Re-directing to new record...'
        );
        // redirect to new
        this.router.replaceWith('record.new');
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