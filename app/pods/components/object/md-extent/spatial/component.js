/* global L */
import Component from '@ember/component';
import { or, alias } from '@ember/object/computed';
import {
  set,
  get,
  getWithDefault,
  setProperties,
  observer,
  computed
} from '@ember/object';
import { isNone } from '@ember/utils';
import { once } from '@ember/runloop';

const {
  isNaN: isNan
} = Number;

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let geo = get(this, 'extent.geographicExtent.0');

    once(function () {
      set(geo, 'boundingBox', (geo.boundingBox === undefined ? {} : geo.boundingBox));
    });
  },

  isTrulyNone(val) {
    return isNone(val) || isNan(val);
  },

  bboxPoly: computed('bbox',
    'bbox.{northLatitude,southLatitude,eastLongitude,westLongitude}',
    function () {
      let bbox = this.bbox;

      if(!bbox) {
        return null;
      }

      if(this.isTrulyNone(bbox.southLatitude) || this.isTrulyNone(bbox.westLongitude) ||
        this.isTrulyNone(bbox.northLatitude) || this.isTrulyNone(bbox.eastLongitude)
      ) {
        return null;
      }

      return [
        [bbox.southLatitude, bbox.westLongitude],
        [bbox.northLatitude, bbox.westLongitude],
        [bbox.northLatitude, bbox.eastLongitude],
        [bbox.southLatitude, bbox.eastLongitude]
      ];
    }),

  bboxPolyObserver: observer('bboxPoly', function () {
    let map = this.map;
    let bbox = this.bboxPoly;

    if(map && bbox) {
      this.setupMap({
        target: map
      });
    }
  }),

  bbox: alias('extent.geographicExtent.0.boundingBox'),
  geographicExtent: alias('extent.geographicExtent.0'),
  hasBbox: or(
    'extent.geographicExtent.0.boundingBox.{northLatitude,southLatitude,eastLongitude,westLongitude}'
  ),
  geographicElement: alias('extent.geographicExtent.0.geographicElement'),
  showMap: or('bboxPoly', 'geographicElement'),
  setupMap(m) {
    let map = m.target;
    let geo = this.geographicElement || [];
    let bbox = this.bboxPoly;
    let features;

    features = bbox ? geo.concat([L.rectangle(bbox).toGeoJSON()]) : [].concat(
      geo);

    let bounds = L.geoJson(features).getBounds();

    map.fitBounds(bounds);

    this.set('map', map);
  },

  deleteFeatures() {
    this.set('geographicElement', []);
  },
  actions: {
    calculateBox() {
      let geo = this.geographicElement;

      if(!(geo && geo.length)) {
        return null;
      }

      let bounds = L.geoJson(geo).getBounds();
      let bbox = this.bbox;

      setProperties(bbox, {
        northLatitude: bounds.getNorth(),
        southLatitude: bounds.getSouth(),
        eastLongitude: bounds.getEast(),
        westLongitude: bounds.getWest()
      });
    },
    clearBox() {
      setProperties(this.bbox, {
        northLatitude: null,
        southLatitude: null,
        eastLongitude: null,
        westLongitude: null
      });
    },
    editFeatures(index) {
      this.editFeatures(index);
    },

    deleteFeatures() {
      this.deleteFeatures();
    }
  }
});
