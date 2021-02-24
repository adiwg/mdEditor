import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class IndexController extends Controller {
  @service('custom-profile')
  customProfiles;

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
}
