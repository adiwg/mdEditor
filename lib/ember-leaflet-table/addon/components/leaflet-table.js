import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import layout from '../templates/components/leaflet-table';
import toGeoJSON from 'npm:togeojson';
import UUID from 'npm:node-uuid';
import csv2geojson from 'npm:csv2geojson';
import shapefile from 'npm:shapefile';
import geojsonCoords from 'npm:geojson-coords';

/* global L */

export default Ember.Component.extend(ResizeAware, {
  layout,
  L,
  resizeService: Ember.inject.service('resize'),
  
  draw: true,
  formData: false,
  fileTypes: ".json,.txt,.kml,.gpx,.txt,.csv,.tab,.shp",
  resizeWidthSensitive: false,
  resizeHeightSensitive: true,
  layers: Ember.A(),
  columns: [{
    "propertyName": "id",
    "title": "ID"
  }, {
    "propertyName": "properties.name",
    "title": "Name"
  }],
  mapAttribution: [
    '<span>',
    'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
    'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
    'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
    'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    '</span>'
  ].join(""),
  lat: 0,
  lng: 0,
  zoom: 2,
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
  handleResize() {
    return Ember.K();
  },
  setFeatureGroup() {
    return Ember.K();
  },
  updateProgressFlash: Ember.observer('progress', function () {
    let progress = this.get('progress');
    let flm = Ember.get(this, 'flashMessages');
    let im = this.get('importMessage');
    let rnd = Ember.String.htmlSafe(Math.round(this.get('progress')));

    if(progress === 100) {
      if(im) {
        Ember.run.later(this, function () {
          im.exitMessage();
          this.set('importMessage', null);
          this.set('progress', 0);
        }, im.get('timeout'));

        return;
      }

      this.set('progress', 0);

      return;
    }

    if(progress > 0) {
      if(!im) {
        let fm = flm._newFlashMessage({
          message: 'Import Started.',
          progressValue: rnd,
          sticky: true,
          showProgress: true,
          destroyOnClick: true
        });
        this.set('importMessage', fm);
        flm._enqueue(fm);
      } else {
        im.set('progressValue', rnd);
      }
    }
  }),
  splitFeatures(json) {
    let features = Ember.A();
    let split = Ember.A();

    if(json.type = "FeatureCollection") {
      json.features.forEach((fea) => {
        if(!fea.geometry) {
          return;
        }

        if(fea.geometry.type === "GeometryCollection") {
          fea.geometry.geometries.forEach((geom, i) => {
            features.pushObject(Ember.Object.create({
              "type": "Feature",
              "id": fea.id ? `${fea.id}-${i}` : UUID.v4(),
              "geometry": geom,
              "properties": fea.properties
            }));
          });
        } else {
          features
            .pushObject(fea);
        }
      });
    } else {
      if(json.geometry) {
        features
          .pushObject(json);
      }
    }

    features.forEach((fea) => {
      let geom = fea.geometry;

      if(geom.type.substring(0, 5) === 'Multi') {
        let newType = geom.type.replace('Multi', '');

        geom.coordinates.forEach(function (coordinates, i) {
          split.pushObject(Ember.Object.create({
            "type": "Feature",
            "id": fea.id ? `${fea.id}-${i}` : UUID.v4(),
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
  debouncedDidResize(width, height, evt) {
    //console.log(`Debounced Resize! ${width}x${height}`);
    this.handleResize(width, height, evt);
    let map = this.get('map');
    if(map){
      map.invalidateSize();
    }
  },
  // didInsertElement() {
  //   this._super.apply(this, arguments);
  //   this._handleDebouncedResizeEvent();
  // },
  parseJSON(file) {
    let data = new TextDecoder()
      .decode(file.data);
    let promise = new Ember.RSVP.Promise(function (resolve, reject) {

      if(typeof data === (typeof {})) {
        return resolve(data);
      }
      try {
        resolve(JSON.parse(data));
      } catch(e) {
        reject(
          `Failed to parse file: ${file.name}. Is it valid JSON?`
        );
      }

    });
    return promise;
  },
  parseXML(file, type) {
    let data = new TextDecoder()
      .decode(file.data);
    let promise = new Ember.RSVP.Promise(function (resolve, reject) {
      try {
        let xml = (new DOMParser())
          .parseFromString(data, 'text/xml');

        resolve(toGeoJSON[type](xml));
      } catch(e) {
        reject(
          `Failed to parse file: ${file.name}. Is it valid ${type.toUpperCase()}?`
        );
      }
    });

    return promise;
  },
  parseDSV(file, type, delim) {
    let data = new TextDecoder()
      .decode(file.data);
    let promise = new Ember.RSVP.Promise(function (resolve, reject) {
      csv2geojson.csv2geojson(data, {
        delimiter: delim
      }, function (err, json) {
        if(err) {
          reject(
            `Failed to parse file: ${file.name}. Is it valid delimited ${type.toUpperCase()}?`
          );
          return;
        }
        resolve(json);
      });

    });

    return promise;
  },
  parseShapeFile(file) {
    let promise = new Ember.RSVP.Promise(function (resolve, reject) {
      let json = Ember.Object.create({
        type: 'FeatureCollection',
        features: Ember.A()
      });
      let vertices = 0;

      shapefile.open(file.data, null)
        .then((source) => {
          return source.read()
            .then(
              function next(result) {
                if(result.done) {
                  return json;
                }
                vertices += geojsonCoords(result.value)
                  .length;
                if(vertices > 5000) {
                  throw(
                    `The import has a limit of 5000 coodinates(vertices). Try simplifying your features.`
                  );
                }
                json.features.pushObject(result.value);
                return source.read()
                  .then(next);
              });
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  actions: {
    readData(file) {
      let fname = file.name;
      let ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2)
        .toLowerCase();
      let data;

      switch(ext) {
      case 'json':
        data = this.parseJSON(file);
        break;
      case 'kml':
        data = this.parseXML(file, 'kml');
        break;
      case 'gpx':
        data = this.parseXML(file, 'gpx');
        break;
      case 'csv':
        data = this.parseDSV(file, ',');
        break;
      case 'tsv':
        data = this.parseDSV(file, '\t');
        break;
      case 'txt':
        data = this.parseDSV(file, 'auto');
        break;
      case 'shp':
        data = this.parseShapeFile(file);
        break;
      default:
        data = false;
        Ember.assert(
          `File extension "${ext}" not implemented.`
        );
      }

      if(data) {
        data.then((json) => {
            let split = this.splitFeatures(json);
            this.get('layers')
              .pushObjects(split);

            Ember.get(this, 'flashMessages')
              .success(`${split.length} features imported!`);
          })
          .catch((reason) => {
            Ember.get(this, 'flashMessages')
              .danger(reason);
          })
          .finally(() => {
            //reset the input field
            Ember.$('.map-file-picker input:file')
              .val('');
          });
      } else {
        Ember.get(this, 'flashMessages')
          .danger('No features imported!');
      }

    },
    showForm(row) {
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
    setup(m) {
      let map = m.target;

      this.set('map', map);
      this._handleDebouncedResizeEvent();

      let layers = this.get('layers');

      if(layers.length) {
        map.fitBounds(L.geoJson(layers)
          .getBounds());
      }
    }
  }
});
