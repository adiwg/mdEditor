import Ember from 'ember';
import layout from '../templates/components/leaflet-table';
//import UUID from 'npm:node-uuid';
//import rowTemplate from '../templates/components/row';
//import geojson from 'npm:leaflet-omnivore';
/* global L */

export default Ember.Component.extend({
  layout,
  L,

  draw: true,
  formData: false,
  loc: [45.528298, -122.662986],
  layers: Ember.A(),
  columns: [{
    "propertyName": "id",
    "title": "ID"
  }, {
    "propertyName": "properties.name",
    "title": "Name"
  }],
  mapAttribution: [
    'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
    'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
    'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
    'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
  ].join(""),
  lat: 0,
  lng: 0,
  zoom: 2,
  drawControl: null,
  //rowTemplate,
  icons: {
    'sort-asc': 'fa fa-caret-up',
    'sort-desc': 'fa fa-caret-down',
    'column-visible': 'fa fa-check-square-o',
    'column-hidden': 'fa fa-square-o',
    'nav-first': 'fa fa-fast-backward',
    'nav-prev': 'fa fa-backward',
    'nav-next': 'fa fa-forward',
    'nav-last': 'fa fa-fast-forward',
    "caret": "fa fa-caret-down"
  },
  customClasses: {
    'table': 'table table-striped table-bordered table-condensed table-hover'
  },
  splitFeatures(json) {
    let features = Ember.A();
    let split = Ember.A();

    if(json.type = "FeatureCollection") {
      json.features.forEach((fea) => {
        //fea.id = fea.id ? fea.id : UUID.v4();
        features
          .pushObject(fea);
      });

    } else {
      features
        .pushObject(json);
    }

    features.forEach((fea) => {
      let geom = fea.geometry;

      if(geom.type.substring(0, 5) === 'Multi') {
        let newType = geom.type.replace('Multi', '');

        geom.coordinates.forEach(function (coordinates, i) {
          split.pushObject(Ember.Object.create({
            "type": "Feature",
            "id": fea.id ? `${fea.id}-${i}` : i,
            "geometry": {
              "type": newType,
              "coordinates": coordinates
            },
            "properties": fea.properties
          }));
        });
      } else {
        split.pushObject(Ember.Object.create(fea));
      }
    });

    return split;
  },
  actions: {
    readData(file) {
      let json;
      let error = false;

      try {
        json = JSON.parse(file.data);

        /*  let jv = Ember.get(this, 'jsonvalidator');
          let valid = jv.validate('jsonapi', json);

          if(!valid) {
            console.log(jv.errorsText());
            error = `${file.name} is not a valid mdEditor file.`;
          }*/
      } catch(e) {
        error = `Failed to parse file: ${file.name}. Is it valid JSON?`;
      } finally {
        //reset the input field
        Ember.$('.map-file-picker input:file')
          .val('');
      }

      if(error) {
        Ember.get(this, 'flashMessages')
          .danger(error);
        return false;
      }

      this.get('layers')
        .pushObjects(this.splitFeatures(json));

    },
    showForm(row) {
      console.info(arguments);
      if(row.get('state') !== 'edit') {
        row.set('state', 'edit');
      }
      row.set('form', true);
      this.set('formData', row);
    },
    closeForm() {
      let formData = this.get('formData');
      
      if(formData) {
        formData.set('form', false);
        this.set('formData', false);
      }
    },
    importData() {},
    setup(m) {
      let map = m.target;
      this.set('map', map);
    }
  }
});
