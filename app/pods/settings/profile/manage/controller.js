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

  definition: null,

  /**
   * Indicates whether the save button should be disabled
   *
   * @property disableSave
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires definition.validations.isInvalid,task.isRunning
   */
  disableSave: or('definition.validations.attrs.uri.isInvalid',
    'task.isRunning'),

  checkForUpdates: task(function* () {
    yield this.profile.checkForUpdates.perform(this.model);
  }),

  actions: {
    addDefinition() {
      this.set('definition', this.store.createRecord('profile'));
    },
    editDefinition(index, record) {
      this.set('definition', record);
    },
    saveDefinition() {
      let definition = this.definition;

      return definition.save().then(rec => {
        let fetched = this.profile.fetchDefinition.perform(rec.uri);

        this.set('task', fetched);

        fetched.then(val => {
          if(val) {
            definition.set('config', val);
            definition.set('remoteVersion', val.version);

            this.flashMessages.success(
              `Downloaded profile definition: ${val.title}.`);
          }
        });
      }).catch(e => {
        this.flashMessages.warning(e.message);
      });

    },

    cancelEdit() {
      let record = this.definition;

      this.set('definition', null);
      record.rollbackAttributes();
    },

    toProfile() {
      this.transitionToRoute('settings.profile');
    }
  }
});
