/* eslint-disable ember/no-actions-hash */
/* eslint-disable ember/no-classic-classes */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { set } from '@ember/object';

export default class IndexController extends Controller {
  @service('custom-profile') customProfile;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  get columns() {
    return [
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
  }

  @action
  addProfile() {
    this.set('profile', this.store.createRecord('custom-profile'));
  }

  @action
  editProfile(index, record) {
    this.set('profile', record);
  }

  @action
  saveProfile() {
    let profile = this.profile;
    return profile.save();
  }

  @action
  cancelEdit() {
    let record = this.profile;

    this.set('profile', null);
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
    set(this, 'profileUrl', null);
  }
}
