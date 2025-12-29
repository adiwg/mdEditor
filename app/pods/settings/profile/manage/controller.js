import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { or } from '@ember/object/computed';

export default class ManageController extends Controller {
  @service profile;
  @service flashMessages;

  definition = null;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  get columns() {
    return [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'uri',
        title: 'URL',
        break: true,
      },
      {
        propertyName: 'description',
        title: 'Description',
        truncate: true,
        isHidden: true,
      },
    ];
  }

  get columnSets() {
    return [
      {
        label: 'URL',
        showColumns: ['title', 'uri'],
      },
    ];
  }

  get badges() {
    return [
      {
        type: 'info',
        icon: 'info-circle',
        tip: 'Update available.',
        isVisible: 'hasUpdate',
      },
    ];
  }

  /**
   * Indicates whether the save button should be disabled
   *
   * @property disableSave
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires definition.validations.isInvalid,task.isRunning
   */
  @or('definition.validations.attrs.uri.isInvalid', 'task.isRunning')
  disableSave;

  @task
  *checkForUpdates() {
    yield this.profile.checkForUpdates.perform(this.model);
  }

  @action
  addDefinition() {
    this.set('definition', this.store.createRecord('profile'));
  }

  @action
  editDefinition(index, record) {
    this.set('definition', record);
  }

  @action
  saveDefinition() {
    let definition = this.definition;

    return definition
      .save()
      .then((rec) => {
        let fetched = this.profile.fetchDefinition.perform(rec.uri);

        this.set('task', fetched);

        fetched.then((val) => {
          if (val) {
            definition.set('config', val);
            definition.set('remoteVersion', val.version);

            this.flashMessages.success(
              `Downloaded profile definition: ${val.title}.`
            );
          }
        });
      })
      .catch((e) => {
        this.flashMessages.warning(e.message);
      });
  }

  @action
  cancelEdit() {
    let record = this.definition;

    this.set('definition', null);
    record.rollbackAttributes();
  }

  @action
  toProfile() {
    this.transitionToRoute('settings.profile');
  }
}
