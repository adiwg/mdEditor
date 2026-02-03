import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfileIndexController extends Controller {
  @service customProfile;
  @service store;

  @tracked profile = null;
  @tracked profileUrl = null;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns = [
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
  ];

  @action
  addProfile() {
    this.profile = this.store.createRecord('custom-profile');
  }

  @action
  editProfile(index, record) {
    this.profile = record;
  }

  @action
  saveProfile() {
    let profile = this.profile;
    return profile.save();
  }

  @action
  cancelEdit() {
    let record = this.profile;

    this.profile = null;
    record.rollbackAttributes();
  }

  @action
  manageDefinitions() {
    this.transitionToRoute('settings.profile.manage');
  }

  @action
  async loadProfilesFromUrl() {
    const loadFromUrl = this.profileUrl;
    if (!loadFromUrl) return;
    const loadProfilesPromise =
      this.customProfile.loadCustomProfilesFromUrl(loadFromUrl);
    await Promise.all([loadProfilesPromise]);
    this.profileUrl = null;
  }
}
