import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import CellContentDisplay from 'mdeditor/pods/components/control/md-record-table/cell-content-display/component';

export default class ProfileIndexController extends Controller {
  @service customProfile;
  @service router;
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
      component: CellContentDisplay,
    },
  ];

  @action
  addProfile() {
    this.profile = this.store.createRecord('custom-profile');
  }

  @action
  editProfile(col, index, record) {
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
    this.router.transitionTo('settings.profile.manage');
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
