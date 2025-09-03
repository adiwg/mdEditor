import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { or } from '@ember/object/computed';

export default class ValidationController extends Controller {
  @service schemas;
  @service flashMessages;

  schema = null;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  get columns() {
    return [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'formattedType',
        title: 'Type',
        filterWithSelect: true,
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
      {
        propertyName: 'formattedGlobal',
        title: 'Global?',
        filterWithSelect: true,
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
   * @requires schema.validations.isInvalid,task.isRunning
   */
  @or('schema.validations.isInvalid', 'task.isRunning')
  disableSave;

  @task
  *checkForUpdates() {
    yield this.schemas.checkForUpdates.perform(this.model);
  }

  @action
  addSchema() {
    this.set('schema', this.store.createRecord('schema'));
  }

  @action
  editSchema(index, record) {
    this.set('schema', record);
  }

  @action
  saveSchema() {
    let schema = this.schema;

    return this.schema
      .save()
      .then((rec) => {
        let fetched = this.schemas.fetchSchemas.perform(rec.uri);

        this.set('task', fetched);

        return fetched.then((val) => {
          schema.set('customSchemas', val);
          schema.set('version', val[0].schema.version);
          schema.set('remoteVersion', schema.version);

          this.flashMessages.success(`Downloaded ${val.length} schemas.`);
        });
      })
      .catch((e) => {
        this.flashMessages.warning(e.message);
      });
  }

  @action
  cancelEdit() {
    let record = this.schema;

    this.set('schema', null);
    record.rollbackAttributes();
  }

  @action
  fetchSchemas(url) {
    this.schemas.fetchSchemas(url);
  }
}
