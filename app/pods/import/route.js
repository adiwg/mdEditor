import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      files: false
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

  actions: {
    readData(file) {
      this.readFile(file)
        .then((file) => {
          let data = JSON.parse(file.data)
            .data;
          let fileMap;

          fileMap = data.reduce(function (map, item) {
            if(!map[item.type]) {
              map[item.type] = [];
            }

            map[item.type].push(item);
            return map;
          }, {});
          this.currentModel.set('files', fileMap);
          this.currentModel.set('data', file.data);
        });
    },
    importData() {
      this.store.importData(this.currentModel.get('data'))
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success('Imported data.', {
              extendedTimeout: 1500
            });
          //this.transitionTo('dashboard');
        });
    },
    showPreview(txt) {
      this.currentModel.set('preview', JSON.parse(txt));
    },
    closePreview() {
      this.currentModel.set('preview', false);
    }
  }
});
