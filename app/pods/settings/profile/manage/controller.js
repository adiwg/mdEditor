import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class ProfileManageController extends Controller {
  @service profile;
  @service flashMessages;
  @service store;

  @tracked definition = null;
  @tracked fetchTask;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns = [{
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
  }];

  columnSets = [{
    label: 'URL',
    showColumns: ['title', 'uri']
  }];

  badges = [{
    type: 'info',
    icon: 'info-circle',
    tip: 'Update available.',
    isVisible: 'hasUpdate'
  }];

  /**
   * Indicates whether the save button should be disabled
   *
   * @property disableSave
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires definition.validations.isInvalid,fetchTask.isRunning
   */
  get disableSave() {
    return this.definition?.validations?.attrs?.uri?.isInvalid || this.fetchTask?.isRunning;
  }

  checkForUpdates = task(async () => {
    await this.profile.checkForUpdates.perform(this.model);
  });

  @action
  addDefinition() {
    this.definition = this.store.createRecord('profile');
  }

  @action
  editDefinition(index, record) {
    this.definition = record;
  }

  @action
  saveDefinition() {
    let definition = this.definition;

    return definition.save().then(rec => {
      let fetched = this.profile.fetchDefinition.perform(rec.uri);

      this.fetchTask = fetched;

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

  }

  @action
  cancelEdit() {
    let record = this.definition;

    this.definition = null;
    record.rollbackAttributes();
  }

  @action
  toProfile() {
    this.transitionToRoute('settings.profile');
  }
}
