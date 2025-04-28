import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';
import DoCancel from 'mdeditor/mixins/cancel';

export default Route.extend(HashPoll, DoCancel, {
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: service('custom-profile'),

  pouch: service(),

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this._super(...arguments);

    this.profile.set('active', model.get('profile'));
  },

  actions: {
    /**
     * Update the dictionary profile
     *
     * @param  {String} profile The new profile.
     */
    saveDictionary: async function () {
      const model = this.currentRouteModel();
      await model.save();
      this.flashMessages.success(`Saved Dictionary: ${model.get('title')}`);
    },
    cancelDictionary: function () {
      let model = this.currentRouteModel();
      let message =
        `Cancelled changes to Dictionary: ${model.get('title')}`;

      if(this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if(json) {
          model.set('json', JSON.parse(json));
          this.doCancel();

          this.flashMessages.warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          this.doCancel();
          this.flashMessages
            .warning(message);
        });
    },
  }
});
