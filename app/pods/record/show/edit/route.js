import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import DoCancel from 'mdeditor/mixins/cancel';

export default Route.extend(DoCancel, {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false
    };
  },

  pouch: service(),
  hashPoll: service(),

  /**
   * The profile service
   * @property profile
   * @return {Ember.Service} profile
   */
  profile: service('custom-profile'),

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this._super(...arguments);

    this.profile.set('active', model.get('profile'));
    this.hashPoll.startPolling(model);
  },

  deactivate() {
    this._super(...arguments);
    this.hashPoll.stopPolling();
  },

  actions: {

    saveRecord: async function () {
      const model = this.currentRouteModel();
      model.updateTimestamp();
      await model.save();
      this.flashMessages.success(`Saved Record: ${model.get('title')}`);
    },

    cancelRecord: function () {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Record: ${model.get('title')}`;

      if(this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if(json) {
          model.revertChanges();
          this.doCancel();
          this.flashMessages.warning(message);
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

    getContext() {
      return this;
    }
  }
});
