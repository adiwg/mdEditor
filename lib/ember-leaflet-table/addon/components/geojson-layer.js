import Ember from 'ember';
import Layer from 'ember-leaflet/components/geojson-layer';
import UUID from 'npm:node-uuid';
/* global L */

export default Layer.extend({
  L,
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

  pointToLayer(json, latlng) {
    let icon = L.VectorMarkers.icon({
      icon: 'circle',
      markerColor: '#428bca'
    });
    return L.marker(latlng, {
      icon: icon,
      riseOnHover: true
    });
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
      });
    }

    return s;
  }),

  formVisible: Ember.on('init', Ember.observer('geoJSON.form', function () {
    let form = this.get('geoJSON.form');

    if(form) {
      let layerGroup = this.get('_layer');
      let drawControl = layerGroup._map.drawControl;

      if(drawControl && drawControl.options.edit.featureGroup === layerGroup) {
        drawControl._toolbars.edit._modes.edit.handler.enable();
      } else {
        this._dblclick({target:layerGroup});
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
