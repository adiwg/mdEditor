import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { or } from '@ember/object/computed';

export default Controller.extend({
  schemas: service(),
  flashMessages: service(),

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns: [
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
  ],

  columnSets: [
    {
      label: 'URL',
      showColumns: ['title', 'uri'],
    },
  ],

  badges: [
    {
      type: 'info',
      icon: 'info-circle',
      tip: 'Update available.',
      isVisible: 'hasUpdate',
    },
  ],

  schema: null,

  /**
   * Indicates whether the save button should be disabled
   *
   * @property disableSave
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires schema.validations.isInvalid,task.isRunning
   */
  disableSave: or('schema.validations.isInvalid', 'task.isRunning'),

  checkForUpdates: task(function* () {
    yield this.schemas.checkForUpdates.perform(this.model);
  }),

  actions: {
    addSchema() {
      this.set('schema', this.store.createRecord('schema'));
    },
    editSchema(index, record) {
      this.set('schema', record);
    },
    saveSchema() {
      let schema = this.schema;

      return this.schema
        .save()
        .then((rec) => {
          let fetched = this.schemas.fetchSchemas.perform(rec.uri);
          console.log(fetched)

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
    },

    cancelEdit() {
      let record = this.schema;

      this.set('schema', null);
      record.rollbackAttributes();
    },
    fetchSchemas(url) {
      this.schemas.fetchSchemas(url);
    },
  },
});
