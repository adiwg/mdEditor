import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { or } from '@ember/object/computed';

export default Controller.extend({
  profile: service(),
  flashMessages: service(),

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns: [{
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'uri',
    title: 'URL',
    break: true
  }, {
    propertyName: 'description',
    title: 'Description',
    truncate: true,
    isHidden: true
  }],

  columnSets: [{
    label: 'URL',
    showColumns: ['title', 'uri']
  }],

  badges: [{
    type: 'info',
    icon: 'info-circle',
    tip: 'Update available.',
    isVisible: 'hasUpdate'
  }],

  profileRecord: null,

/**
* Indicates whether the save button should be disabled
*
* @property disableSave
* @type {Boolean}
* @readOnly
* @category computed
* @requires profileRecord.validations.isInvalid,task.isRunning
*/
  disableSave: or('profileRecord.validations.isInvalid', 'task.isRunning'),

  checkForUpdates: task(function* () {
    yield this.profile.checkForUpdates.perform(this.model);
  }),

  actions: {
    addProfile() {
      this.set('profileRecord', this.store.createRecord('profile'));
    },
    editProfile(index, record) {
      this.set('profileRecord', record);
    },
    saveProfile() {
      let profileRecord = this.profileRecord;

      return profileRecord.save().then(/*rec => {
        let fetched = this.schemas.fetchProfiles.perform(rec.uri);

        this.set('task', fetched);

        return fetched.then(val => {
          profileRecord.set('customProfiles', val);
          profileRecord.set('version', val[0].profileRecord.version);
          profileRecord.set('remoteVersion', profileRecord.version);

          this.flashMessages.success(
            `Downloaded ${val.length} schemas.`);
        });
      }*/).catch(e => {
        this.flashMessages.warning(e.message);
      });

    },

    cancelEdit() {
      let record = this.profileRecord;

      this.set('profileRecord', null);
      record.rollbackAttributes();
    },
    fetchProfiles(url) {
      this.schemas.fetchProfiles(url);
    }
  }
});
