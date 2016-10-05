import Ember from 'ember';
import LeafletMap from 'ember-leaflet/components/leaflet-map';
//import UUID from 'npm:node-uuid';
/* global L */

export default LeafletMap.extend({
  L,
  leafletOptions: ['drawControl'],
  leafletEvents: ['draw:deletestart', 'draw:deletestop', 'draw:deleted'],
  //drawControl:false,

  didCreateLayer() {
    this._super(...arguments);
    let map = this._layer;
    // Initialise the draw control and pass it the FeatureGroup of editable layers
    let drawControl = new this.L.Control.Draw({
      draw: {
        circle: false
      }
    });
    map.addControl(drawControl);

    map.on('draw:created', (e) => {
      let layer = e.layer;

      // if(type === 'marker') {
      //   layer.bindPopup('A popup!');
      // }
      let json = Ember.Object.create(layer.toGeoJSON());
      //json.id = UUID.v4();
      json.properties.name = `New ${json.geometry.type} Feature`;
      this.get('editLayers')
        .pushObject(json);
    });

    map.on('draw:editstart', (e) => {
      let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
      layers.forEach((layer) => {
        if(layer.hasOwnProperty('editing')) {
          if(layer.feature.get('state') !== 'edit') {
            layer.feature.set('state', 'edit');
          }
        }
      });
    });

    map.on('draw:editstop', (e) => {
      let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
      layers.forEach((layer) => {
        let geo = layer.toGeoJSON();

        layer.feature.set('geometry', geo.geometry);
        layer.feature.set('state', '');
      });
    });

    map.on('dblclick',
      function () {
        map.doubleClickZoom.enable();
      });
  },
  '_draw:deletestart': function (e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    layers.forEach((layer) => {
      if(layer.hasOwnProperty('editing')) {
        if(layer.feature.get('state') !== 'remove') {
          layer.feature.set('state', 'remove');
        }
      }
    });
  },
  '_draw:deletestop': function (e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    layers.forEach((layer) => {
      layer.feature.set('state', '');
    });
  },
  '_draw:deleted': function (e) {
    let layers = this.get('editLayers');

    e.layers.eachLayer((layer) => {
      layers.removeObject(layer.feature);
    });
  }
});
