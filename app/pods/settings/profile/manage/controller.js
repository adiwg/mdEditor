import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { or } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

@classic
export default class ManageController extends Controller {
  @service
  profile;

  @service
  flashMessages;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns = [
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

  columnSets = [
    {
      label: 'URL',
      showColumns: ['title', 'uri'],
    },
  ];

  badges = [
    {
      type: 'info',
      icon: 'info-circle',
      tip: 'Update available.',
      isVisible: 'hasUpdate',
    },
  ];

  definition = null;

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

  @task(function* () {
    yield this.profile.checkForUpdates.perform(this.model);
  })
  checkForUpdates;

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
