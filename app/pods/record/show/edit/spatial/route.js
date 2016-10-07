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
      })],
      featureGroup: null
    });
  },
  actions: {
    uploadData() {
      Ember.$('.map-file-picker .file-picker__input')
        .click();
    },
    deleteAllFeatures() {

      this.currentModel.set('layers', Ember.A());
    },
    setFeatureGroup(obj) {
      this.currentModel.set('featureGroup', obj);
    },
    zoomAll() {
      let layer = this.currentModel.get('featureGroup');
      let bnds = layer.getBounds();

      layer._map.fitBounds(bnds, {
        maxZoom: 14
      });
    },
    exportGeoJSON() {
      let fg = this.currentModel.get('featureGroup');

      let json = {
        'type': 'FeatureCollection',
        'features': []
      };

      if(fg) {
        let geoGroup = fg.getLayers();
        geoGroup.forEach((l) => {
          let layers = l.getLayers();

          layers.forEach((layer) => {
            let feature = layer.feature;

            json.features.push({
              'type': 'Feature',
              'id': feature.id,
              'geometry': feature.geometry,
              'properties': feature.properties
            });
          });
        });

        window.saveAs(
          new Blob([JSON.stringify(json)], {
            type: 'application/json;charset=utf-8'
          }),
          'export_features.json'
        );

        // return new Ember.RSVP.Promise((resolve) => {
        //   Ember.run(null, resolve, json);
        // }, 'MD: ExportSpatialData');

      } else {
        Ember.get(this, 'flashMessages')
          .warning('Found no features to export.');
      }
    }
  }
});
