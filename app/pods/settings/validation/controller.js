import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  schemas: service(),
  flashMessages: service(),

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  columns: [{
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
  }],

  columnSets: [{
    label: 'URL',
    showColumns: ['title', 'uri']
  }],

  schema: null,

  actions: {
    addSchema(){
      this.set('schema', this.store.createRecord('schema'));
    },
    editSchema(index, record){
      this.set('schema', record);
    },
    saveSchema() {
      let schema = this.schema;

      return this.schema.save().then(rec => {
        let fetched = this.schemas.fetchSchemas.perform(rec.uri);

        this.set('task', fetched);

        return fetched.then(val => {
          schema.set('customSchemas', val);
          this.flashMessages.success(`Downloaded ${val.length} schemas.`);
        });
      }).catch(e => {
        this.flashMessages.warning(e.message);
      });

    },

    cancelEdit(){
      let record=this.schema;

      this.set('schema', null);
      record.rollbackAttributes();
    },
    checkUpdate(){
    },
    fetchSchemas(url){
      this.schemas.fetchSchemas(url);
    }
  }
});
