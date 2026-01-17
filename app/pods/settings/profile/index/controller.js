/* eslint-disable ember/no-actions-hash */
/* eslint-disable ember/no-classic-classes */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  customProfile: service('custom-profile'),
  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns: [
    {
      propertyName: 'title',
      title: 'Title',
    },
    {
      propertyName: 'definition.title',
      title: 'Definition',
    },
    {
      propertyName: 'description',
      title: 'Description',
      truncate: true,
      isHidden: false,
    },
  ],

  actions: {
    addProfile() {
      this.set('profile', this.store.createRecord('custom-profile'));
    },
    editProfile(index, record) {
      this.set('profile', record);
    },
    saveProfile() {
      let profile = this.profile;
      return profile.save();
    },

    cancelEdit() {
      let record = this.profile;

      this.set('profile', null);
      record.rollbackAttributes();
    },
    manageDefinitions() {
      this.transitionToRoute('settings.profile.manage');
    },

    async loadProfilesFromUrl() {
      const loadFromUrl = this.profileUrl;
      if (!loadFromUrl) return;
      const loadProfilesPromise =
        this.customProfile.loadCustomProfilesFromUrl(loadFromUrl);
      await Promise.all([loadProfilesPromise]);
      set(this, 'profileUrl', null);
    },
  },
});
