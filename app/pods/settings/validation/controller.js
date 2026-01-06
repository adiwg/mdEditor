import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class ValidationController extends Controller {
  @service schemas;
  @service flashMessages;
  @service store;

  @tracked schema = null;
  @tracked fetchTask;

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns = [{
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'formattedType',
    title: 'Type',
    filterWithSelect: true
  }, {
    propertyName: 'uri',
    title: 'URL',
    break: true
  }, {
    propertyName: 'description',
    title: 'Description',
    truncate: true,
    isHidden: true
  }, {
    propertyName: 'formattedGlobal',
    title: 'Global?',
    filterWithSelect: true
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
  * @requires schema.validations.isInvalid,fetchTask.isRunning
  */
  get disableSave() {
    return this.schema?.validations?.attrs?.isInvalid || this.fetchTask?.isRunning;
  }

  checkForUpdates = task(async () => {
    await this.schemas.checkForUpdates.perform(this.model);
  });

  @action
  addSchema() {
    this.schema = this.store.createRecord('schema');
  }

  @action
  editSchema(index, record) {
    this.schema = record;
  }

  @action
  saveSchema() {
    let schema = this.schema;

    return this.schema.save().then(rec => {
      let fetched = this.schemas.fetchSchemas.perform(rec.uri);

      this.fetchTask = fetched;

      return fetched.then(val => {
        schema.set('customSchemas', val);
        schema.set('version', val[0].schema.version);
        schema.set('remoteVersion', schema.version);

        this.flashMessages.success(
          `Downloaded ${val.length} schemas.`);
      });
    }).catch(e => {
      this.flashMessages.warning(e.message);
    });

  }

  @action
  cancelEdit() {
    let record = this.schema;

    this.schema = null;
    record.rollbackAttributes();
  }

  @action
  fetchSchemas(url) {
    this.schemas.fetchSchemas(url);
  }
}
