import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  customProfiles: service('custom-profile'),
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

  // columnSets: [],
  //
  // badges: [{
  //   type: 'info',
  //   icon: 'info-circle',
  //   tip: 'Update available.',
  //   isVisible: 'hasUpdate'
  // }],
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
  },
});
