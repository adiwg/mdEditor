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

      // Ensure title and description are properly stored
      // If config doesn't exist yet, create it
      if (!profile.get('config')) {
        profile.set('config', {});
      }

      // Ensure title is stored in the appropriate backing property
      if (profile.get('title') && !profile.get('alias')) {
        // If title is set but alias is not, store it in config.title
        profile.set('config.title', profile.get('title'));
      }

      // Ensure description is stored in the appropriate backing property
      if (profile.get('description') && !profile.get('altDescription')) {
        // If description is set but altDescription is not, store it in config.description
        profile.set('config.description', profile.get('description'));
      }

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
