import EmberObject, { get, set } from '@ember/object';
import LeafletMap from 'ember-leaflet/components/leaflet-map';
//import uuidV4 from 'uuid/v4';
/* global L */

export default LeafletMap.extend({
  L,
  leafletOptions: ['drawControl'],
  leafletEvents: [
    'draw:editstart',
    'draw:editstop',
    'draw:deletestart',
    'draw:deletestop',
    'draw:deleted',
    'draw:editmove'
  ],
  //drawControl:false,
  maxZoom: 18,
  minZoom: 1,
  maxBounds: L.latLngBounds(L.latLng(-90, -360), L.latLng(90, 360)),
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
        circle: false,
        circlemarker: false
      }
    });
    map.addControl(drawControl);

    map.on('draw:created', (e) => {
      let layer = e.layer;

      console.log(layer instanceof L.Marker)
      console.log(layer instanceof L.Polygon)
      //Fix vertices that are only in one world
      if (layer instanceof L.Marker) {
        layer.setLatLng(this.fixVertex(layer.getLatLng()));
      } else {
        //TODO: fix this for polygons, needs to be tested later
        let latlngs = layer.getLatLngs();
        //is the poly all in one world?
        let one = latlngs.forEach((vertex) => {
          return Math.abs(vertex.lng) > 180;
        });

        if (one) {
          let fixed = latlngs.map((vertex) => {
            return this.fixVertex(vertex);
          });

          layer.setLatLngs(fixed);
        }
      }

      let json = EmberObject.create(layer.toGeoJSON());
      //json.id = uuidV4();
      json.properties.name = `New ${json.geometry.type} Feature`;
      this.get('editLayers')
        .pushObject(json);
    });

    map.on('dblclick',
      function() {
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
  '_draw:editstart': function(e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    layers.forEach((layer) => {
      if (layer.hasOwnProperty('editing')) {
        if (get(layer, 'feature.state') !== 'edit') {
          set(layer, 'feature.state', 'edit');
        }
      }
    });

    if (layers.length === 1) {
      this.showForm(layers[0].feature);
    }
  },
  '_draw:editstop': function(e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    if (layers.length) {

      layers.forEach((layer) => {
        let geo = layer.toGeoJSON();

        set(layer, 'feature.geometry', geo.geometry);
        set(layer, 'feature.state', '');
      });

      this.closeForm();
    } else {
      e.target.drawControl.remove();
    }
  },
  '_draw:deletestart': function(e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();

    layers.forEach((layer) => {
      if (layer.hasOwnProperty('editing')) {
        if (get(layer,'feature.state') !== 'remove') {
          set(layer, 'feature.state', 'remove');
        }
      }
    });

  },
  '_draw:deletestop': function(e) {
    let layers = e.target.drawControl.options.edit.featureGroup.getLayers();
    if (layers.length) {
      layers.forEach((layer) => {
        set(layer, 'feature.state', '');
      });
    } else {
      e.target.drawControl.remove();
    }
  },
  '_draw:deleted': function(e) {
    let layers = this.get('editLayers');

    e.layers.eachLayer((layer) => {
      layers.removeObject(layer.feature);
    });
  },

  fixVertex(vertex) {
    let lng = vertex.lng;
    let worlds = Math.floor(Math.abs(lng) / 360);

    if (worlds > 0) {
      lng = lng - (360 * worlds * Math.sign(lng));
    }

    if (Math.abs(lng) > 180) {
      lng = (360 - Math.abs(lng)) * Math.sign(lng) * -1;
    }

    return new L.LatLng(vertex.lat, lng);
  }
});
