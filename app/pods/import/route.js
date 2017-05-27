import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  jsonvalidator: Ember.inject.service(),

  model() {
    return Ember.Object.create({
      files: false,
      merge: true
    });
  },

  getTitle(record) {
    let raw = record.attributes.json;
    let json = raw ? JSON.parse(raw) : null;

    switch(record.type) {
    case 'records':
      return json.metadata.resourceInfo.citation.title;
    case 'dictionaries':
      return json.dictionaryInfo.citation.title;
    case 'contacts':
      return json.name;
    default:
      return 'N/A';
    }
  },

  actions: {
    readData(file) {
      let json;
      let fileMap;
      let error = false;

      try {
        json = JSON.parse(file.data);

        let jv = Ember.get(this, 'jsonvalidator');
        let valid = jv.validate('jsonapi', json);

        if(!valid) {
          error = `${file.name} is not a valid mdEditor file.`;
        }
      } catch(e) {
        error = `Failed to parse file: ${file.name}. Is it valid JSON?`;
      } finally {
        //reset the input field
        Ember.$('.import-file-picker input:file')
          .val('');
      }

      if(error) {
        Ember.get(this, 'flashMessages')
          .danger(error);
        return false;
      }

      fileMap = json.data.reduce((map, item) => {

        if(!map[item.type]) {
          map[item.type] = [];
        }

        item.meta = {};
        item.meta.title = this.getTitle(item);
        item.meta.export = true;

        map[item.type].push(item);
        return map;
      }, {});
      this.currentRouteModel()
        .set('files', fileMap);
      this.currentRouteModel()
        .set('data', json.data);
    },
    importData() {
      let data = {
        data: this.currentRouteModel()
          .get('data')
          .filter((record) => {
            return record.meta.export;
          })
      };

      this.store.importData(data, {
          truncate: !this.currentRouteModel()
            .get('merge'),
          json: false
        })
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(
              `Imported data. Records were
              ${this.currentRouteModel().get('merge') ? 'merged' : 'replaced'}.`, {
                extendedTimeout: 1500
              });
          //this.transitionTo('dashboard');
        });
    },
    showPreview(model) {
      let json = {};
      Ember.assign(json, model.attributes);

      if(model.attributes.json) {
        json.json = JSON.parse(model.attributes.json);
      }

      this.currentRouteModel()
        .set('preview', {
          model: model,
          json: json
        });
    },
    closePreview() {
      this.currentRouteModel()
        .set('preview', false);
    },
    cancelImport() {
      this.currentRouteModel()
        .set('files', false);
    }
  }
});
