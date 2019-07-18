import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';
import DoCancel from 'mdeditor/mixins/cancel';

export default Route.extend(HashPoll, DoCancel, {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false
    };
  },

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: service('custom-profile'),

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this._super(...arguments);

    this.profile.set('active', model.get('profile'));
  },

  actions: {
    /**
     * Update the record profile
     *
     * @name   updateProfile
     * @param  {String} profile The new profile.
     */
    // updateProfile(profile) {
    //   this.profile
    //     .set('active', profile);
    //   this.modelFor('record.show.edit')
    //     .save();
    // },

    saveRecord: function () {
      let model = this.currentRouteModel();
      model
        .save()
        .then(() => {
          this.flashMessages.success(
            `Saved Record: ${model.get('title')}`);
        });
    },

    // destroyRecord: function () {
    //   let model = this.currentRouteModel();
    //   model
    //     .destroyRecord()
    //     .then(() => {
    //       get(this, 'flashMessages')
    //         .success(`Deleted Record: ${model.get('title')}`);
    //       this.replaceWith('records');
    //     });
    // },

    cancelRecord: function () {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Record: ${model.get('title')}`;

      if(this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if(json) {
          model.set('json', JSON.parse(json));

          this.doCancel();

          this.flashMessages
            .warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          this.doCancel();
          this.flashMessages.warning(message);
        });
    },

    // copyRecord: function () {
    //
    //   get(this, 'flashMessages')
    //     .success(
    //       `Copied Record: ${this.currentRouteModel().get('title')}`);
    //   this.transitionTo('record.new.id', copy(this.currentRouteModel()));
    // },
    getContext() {
      return this;
    }
  }
});
