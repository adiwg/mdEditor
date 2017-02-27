import Ember from 'ember';
import LeafletMap from 'ember-leaflet/components/leaflet-map';
//import uuidV4 from 'npm:uuid/v4';
/* global L */

export default LeafletMap.extend({
  L,
  leafletOptions: ['drawControl'],
  leafletEvents: [
    'draw:editstart',
    'draw:editstop',
    'draw:deletestart',
    'draw:deletestop',
    'draw:deleted'
  ],
  //drawControl:false,
  maxZoom: 18,
  minZoom: 1,
  maxBounds: L.latLngBounds(L.latLng(-90, -360),L.latLng(90, 360)),
  maxBoundsViscosity: 0.2,
  worldCopyJump: true,
  didCreateLayer() {
    this._super(...arguments);
    let map = this._layer;

    L.control.scale()
      .addTo(map);

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
      //json.id = uuidV4;
      json.properties.name = `New ${json.geometry.type} Feature`;
      this.get('editLayers')
        .pushObject(json);
    });

    map.on('dblclick',
      function () {
        map.doubleClickZoom.enable();
      });

    // map.on('layerremove',
    //   function (e) {
    //     let layer = e.layer;
    //     let draw = map.drawControl;
    //     //let tbar = draw._toolbars.edit;
    //     //let mode = tb._activeMode.handler.type;
    //
    //     if(draw && mode) {
    //       let group = draw._toolbars.edit.options.featureGroup;
    //
    //       group.removeLayer(layer);
    //
    //       if(group.getLayers()
    //         .length === 0) {
    //         draw.remove();
    //       }
    //     }
    //   });
  },
  '_draw:editstart': function (e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    layers.forEach((layer) => {
      if(layer.hasOwnProperty('editing')) {
        if(layer.feature.get('state') !== 'edit') {
          layer.feature.set('state', 'edit');
        }
      }
    });

    if(layers.length === 1) {
      this.showForm(layers[0].feature);
    }
  },
  '_draw:editstop': function (e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    if(layers.length) {

      layers.forEach((layer) => {
        let geo = layer.toGeoJSON();

        layer.feature.set('geometry', geo.geometry);
        layer.feature.set('state', '');
      });

      this.closeForm();
    } else {
      e.target.drawControl.remove();
    }
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
    if(layers.length) {
      layers.forEach((layer) => {
        layer.feature.set('state', '');
      });
    } else {
      e.target.drawControl.remove();
    }
  },
  '_draw:deleted': function (e) {
    let layers = this.get('editLayers');

    e.layers.eachLayer((layer) => {
      layers.removeObject(layer.feature);
    });
  }
});
