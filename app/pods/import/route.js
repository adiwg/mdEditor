import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      files: false,
      merge: true
    });
  },

  readFile(file) {
    const reader = new FileReader();

    return new Ember.RSVP.Promise((resolve) => {
      reader.onload = function (event) {
        resolve({
          file: file.name,
          type: file.type,
          data: event.target.result,
          size: file.size
        });
      };

      reader.readAsText(file);
    });
  },

  getTitle(record) {
    let json = record.json;

    switch(record.type) {
    case 'records':
      return json.metadata.resourceInfo.citation.title;
    case 'dictionaries':
      return json.dictionaryInfo.citation.title;
    case 'contacts':
      return json.individualName || json.organizationName;
    default:
      return 'N/A';
    }
  },

  actions: {
    readData(file) {
      this.readFile(file)
        .then((file) => {
          let data = JSON.parse(file.data)
            .data;
          let fileMap;

          fileMap = data.reduce((map, item) => {
            let json = item.attributes.json;

            if(!map[item.type]) {
              map[item.type] = [];
            }

            if(typeof json === 'string') {
              item.json = JSON.parse(json);
            }

            item.title = this.getTitle(item);
            item.checked = true;

            map[item.type].push(item);
            return map;
          }, {});
          this.currentModel.set('files', fileMap);
          this.currentModel.set('data', data);
        });
    },
    importData() {
      let data = {
        data: this.currentModel.get('data')
          .filter((record) => {
            return record.checked;
          })
      };

      this.store.importData(data, {
          truncate: !this.currentModel.get('merge'),
          json: false
        })
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(
              `Imported data. Records were
              ${this.currentModel.get('merge') ? 'merged' : 'replaced'}.`, {
                extendedTimeout: 1500
              });
          //this.transitionTo('dashboard');
        });
    },
    showPreview(model) {
      let json = model.json || JSON.stringify(model.attributes);

      this.currentModel.set('preview', {
        model: model,
        json: json
      });
    },
    closePreview() {
      this.currentModel.set('preview', false);
    },
    cancelImport() {
      this.currentModel.set('files', false);
    }
  }
});
