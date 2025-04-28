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

  pouch: service(),

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
  },

  actions: {

    saveRecord: async function () {
      const model = this.currentRouteModel();
      await model.save();
      this.flashMessages.success(`Saved Record: ${model.get('title')}`);
    },

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

    getContext() {
      return this;
    }
  }
});
