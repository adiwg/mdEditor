import Ember from 'ember';

const {
  Object: EmberObject,
  NativeArray
} = Ember;

export default Ember.Route.extend({
  model(params) {
    this.set('extentId', params.extent_id);

    return this.setupModel();

  },

  renderTemplate() {
    this.render('record.show.edit.spatial.extent', {
      into: 'record.show.edit'
    });
  },

  subbar: 'control/subbar-extent',

  // clearSubbar: function() {
  //   this.controllerFor('record.show.edit')
  //     .set('subbar', null);
  // }.on('deactivate'),

  setupController: function (controller) {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .setProperties({
        subbar: this.get('subbar'),
        onCancel: this.setupModel,
        extentId: this.get('extentId')
      });

    controller
      .setProperties({
        featureGroup: null,
        extentId: this.get('extentId')
      });
  },

  setupModel() {
    let model = this.modelFor('record.show.edit.spatial');
    let extents = model.get('json.metadata.resourceInfo.extent');
    let extent = extents[this.get('extentId') || this.controller.get(
      'extentId')];
    let layers = NativeArray.apply(extent.geographicElement);

    layers.forEach(function (l, idx, arr) {
      arr.replace(idx, 1, EmberObject.create(l));
    });

    this.set('layers', layers);

    return model;
  },

  actions: {
    getContext() {
      return this;
    },
    didTransition() {
      this.controllerFor('record.show.edit')
        .set('subbar', this.get('subbar'));

    },
    handleResize() {
      Ember.$('.map-file-picker .leaflet-container')
        .height((Ember.$(window)
          .height() - Ember.$('#md-navbars')
          .outerHeight() - 15) / 2);
    },
    uploadData() {
      Ember.$('.map-file-picker .file-picker__input')
        .click();
    },
    deleteAllFeatures() {
      let features = this.get('layers');
      let group = this.controller
        .get('featureGroup');

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
      this.controller
        .set('featureGroup', obj);
    },
    zoomAll() {
      let layer = this.controller
        .get('featureGroup');
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
      let fg = this.controller
        .get('featureGroup');

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
