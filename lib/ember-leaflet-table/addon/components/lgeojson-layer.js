import Ember from 'ember';
import Layer from 'ember-leaflet/components/geojson-layer';
import UUID from 'npm:node-uuid';
/* global L */

export default Layer.extend({
  L,
  leafletEvents: ['layerremove'],
  didCreateLayer() {
    this._super(...arguments);
    let json = this.get('geoJSON');

    //define non-enumberable properties
    Object.defineProperties(json, {
      _layer: {
        writable: true,
        configurable: true,
        enumerable: false,
        value: this.get('_layer')
      },
      state: {
        writable: true,
        configurable: true,
        enumerable: false,
        value: ''
      },
      form: {
        writable: true,
        configurable: true,
        enumerable: false,
        value: false
      }
    });
  },
  draw: true,
  //drawControl: null,
  icon: L.VectorMarkers.icon({
    icon: 'circle',
    markerColor: '#428bca' //this.get('fill')
  }),

  hoverIcon: L.VectorMarkers.icon({
    icon: 'circle',
    markerColor: '#f0ad4e' //this.get('hoverFill')
  }),

  editIcon: L.VectorMarkers.icon({
    icon: 'arrows',
    markerColor: '#5bc0de' //this.get('editFill')
  }),

  removeIcon: L.VectorMarkers.icon({
    icon: 'times',
    markerColor: '#d9534f' //this.get('editFill')
  }),
  coordsToLatLng(coords) {
    let longitude = coords[0];
    let latitude = coords[1];
    let worlds = Math.floor(Math.abs(longitude) / 360);

    if(worlds > 0) {
      longitude = longitude - (360 * worlds * Math.sign(longitude));
      coords[0] = longitude;
    }

    let latlng = L.latLng(latitude, longitude, coords[2]);

    return latlng;
  },
  pointToLayer(json, latlng) {
    let icon = L.VectorMarkers.icon({
      icon: 'circle',
      markerColor: '#428bca'
    });
    let marker = L.marker(latlng, {
      icon: icon,
      riseOnHover: true
    });
    // let enter = (e) => {
    //   let feature = e.data.feature;
    //
    //   if(!feature.get('state')) {
    //     feature.set('state', 'hover');
    //   }
    // };
    // let leave = (e) => {
    //   let feature = e.data.feature;
    //   if(feature.get('state') === 'hover') {
    //     feature.set('state', '');
    //   }
    // };
    //
    // marker.on({
    //   add: (e) => {
    //     console.info(arguments);
    //     Ember.$(e.target._icon)
    //       .on({
    //         'mouseenter': enter,
    //         'mouseleave': leave
    //       }, null, e.target);
    //   },
    //   remove: (e) => {
    //     console.info(arguments);
    //     Ember.$(e.target._icon)
    //       .off({
    //         'mouseenter': enter,
    //         'mouseleave': leave
    //       });
    //   }
    // });

    return marker;
  },
  featureAdded: Ember.on('init', Ember.observer('geoJSON', function () {
    let json = this.get('geoJSON');
    if(!json.id) {
      json.set('id', UUID.v4());
    }
  })),

  defaultColor: '#428bca',
  hoverColor: '#f0ad4e',
  editColor: '#5bc0de',
  removeColor: '#d9534f',
  /*color: Ember.computed('geoJSON.color', function () {
    //this.set('color', 'green');
    return this.get('geoJSON.color');
  }),*/
  className: Ember.computed('geoJSON.state', function () {
    let layerGroup = this.get('_layer');
    let s = this.get('geoJSON.state');

    if(layerGroup) {
      let layers = layerGroup.getLayers();
      let features = [];

      layers.forEach((layer) => {
        let state = layer.feature.state;
        let icon = !!state ? state + 'Icon' : 'icon';
        let color = !!state ? state + 'Color' : 'defaultColor';

        if(layer instanceof this.L.Marker) {
          layer.setIcon(this.get(icon));
        } else {
          this.set('color', this.get(color));

          if(layer.options.fill) {
            this.set('fillColor', this.get(color));
          }
        }

        features.push(layer.feature);
      });

      if(s === 'hover') {
        //make sure only one layer is highlighted at a time
        //fix for mouseleave/mouseout not firing properly on markers
        this.get('editLayers')
          .filter((itm) => {
            return features.indexOf(itm) === -1;
          })
          .forEach((obj) => {
            obj.set('state', '');
          });
      }
    }

    return s;
  }),

  formVisible: Ember.on('init', Ember.observer('geoJSON.form',
    function () {
      let form = this.get('geoJSON.form');

      if(form) {
        let layerGroup = this.get('_layer');
        let drawControl = layerGroup._map.drawControl;

        if(drawControl && drawControl.options.edit.featureGroup ===
          layerGroup) {

          let handler = drawControl._toolbars.edit._modes.edit.handler;

          if(!handler.enabled()) {
            handler.enable();
          }
        } else {
          this._dblclick({
            target: layerGroup
          });
        }
      }
    })),
  onMouseover(e) {
    let feature = e.layer.feature;

    if(!feature.get('state')) {
      feature.set('state', 'hover');
    }
  },
  onMouseout(e) {
    let feature = e.layer.feature;

    if(feature.get('state') === 'hover') {
      feature.set('state', '');
    }
  },

  _dblclick(e) {
    let layer = e.target;
    let map = layer._map;
    let existing = map.drawControl;
    map.doubleClickZoom.disable();

    //remove existing control until this is fixed:
    //https://github.com/Leaflet/Leaflet.draw/issues/66
    if(existing) {
      existing.remove();
    }

    if(this.get('draw')) {
      // Initialise the draw control and pass it the GeoJSON layerGroup
      let drawControl = new this.L.Control.Draw({
        edit: {
          featureGroup: layer
        },
        draw: false
      });

      drawControl.addTo(map);
      map.drawControl = drawControl;
      drawControl._toolbars.edit._modes.edit.handler.enable();
    }
  }
});
