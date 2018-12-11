import $ from 'jquery';
import Route from '@ember/routing/route';
import EmberObject, { get, set } from '@ember/object';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';

export default Route.extend({
  model(params) {
    this.set('extentId', params.extent_id);

    return this.setupModel();

  },

  renderTemplate() {
    this.render('record.show.edit.extent.spatial', {
      into: 'record.show.edit'
    });
  },

  subbar: 'control/subbar-spatial',

  // clearSubbar: function() {
  //   this.controllerFor('record.show.edit')
  //     .set('subbar', null);
  // }.on('deactivate'),

  setupController: function(controller) {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .setProperties({
        subbar: this.subbar,
        onCancel: this.setupModel,
        cancelScope: this,
        extentId: this.extentId
      });

    controller
      .setProperties({
        featureGroup: null,
        extentId: this.extentId
      });
  },

  setupModel() {
    let model = this.modelFor('record.show.edit.extent');
    let extents = model.get('json.metadata.resourceInfo.extent');
    let extent = get(extents, this.extentId || this.controller.get(
      'extentId'));

    //make sure the extent still exists
    if(isEmpty(extent)) {
      get(this, 'flashMessages')
        .warning('No extent found! Re-directing to list...');
      this.replaceWith('record.show.edit.extent');

      return;
    }

    if(!isArray(extent.geographicExtent[0].geographicElement)) {
      set(extent, 'geographicExtent.0.geographicElement', A([]));
    }

    let layers = extent.geographicExtent[0].geographicElement;

    layers.forEach(function(l, idx, arr) {
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
        .set('subbar', this.subbar);

    },
    handleResize() {
      $('.map-file-picker .leaflet-container')
        .height(($(window)
          .height() - $('#md-navbars')
          .outerHeight() - 15) / 2);
    },
    uploadData() {
      $('.map-file-picker .file-picker__input')
        .click();
    },
    deleteAllFeatures() {
      let features = this.layers;
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
        get(this, 'flashMessages')
          .warning('Found no features to export.');
      }
    }
  }
});
