import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let extents = this.modelFor('record.show.edit.spatial')
      .get('extents');
    let extent = extents[params.extent_id];
    let layers = Ember.NativeArray.apply(extent.geographicElement);

    layers.forEach(function(l, idx, arr){
      arr[idx] = Ember.Object.create(l);
    });

    return Ember.Object.create({
      layers: layers,
      featureGroup: null
    });
  },

  renderTemplate() {
    this.render('record.show.edit.spatial.extent', {
      into: 'record.show.edit'
    });
  },

  subbar: 'control/subbar-extent',

  deactivate: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', null);
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.get('subbar'));
  },

  actions: {
    handleResize() {
      Ember.$('.map-file-picker')
        .height(Ember.$(window)
          .height() - Ember.$('#md-navbars')
          .outerHeight() - 15);
    },
    uploadData() {
      Ember.$('.map-file-picker .file-picker__input')
        .click();
    },
    deleteAllFeatures() {
      let features = this.currentModel.get('layers');
      let group = this.currentModel.get('featureGroup');

      if(features.length) {
        features.forEach((item) => {
          features.popObject(item);
          group.removeLayer(item._layer);
        });

        if(group._map.drawControl) {
          group._map.drawControl.remove();
        }
        features.clear();
      }
    },
    setFeatureGroup(obj) {
      this.currentModel.set('featureGroup', obj);
    },
    zoomAll() {
      let layer = this.currentModel.get('featureGroup');
      let bnds = layer.getBounds();
      let map = layer._map;

      if(bnds.isValid()) {
        map.fitBounds(bnds, {
          maxZoom: 14
        });
        return;
      }

      map.fitWorld();
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
