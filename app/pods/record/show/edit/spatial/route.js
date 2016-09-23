import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      layers: [Ember.Object.create({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [125.6, 10.1]
        },
        "properties": {
          "name": "Dinagat Islands"
        }
      })]
    });
  },
  actions: {
    uploadData() {
      Ember.$('.map-file-picker .file-picker__input')
        .click();
    },
    deleteAllFeatures() {

      this.currentModel.set('layers', Ember.A());
    }
  }
});
