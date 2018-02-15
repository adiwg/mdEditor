import Ember from 'ember';
/* global L */

const {
  Component,
  computed,
  observer,
  computed: {
    alias,
    or
  },
  setProperties,
  isNone,
} = Ember;

const {
  isNaN:isNan
} = Number;

export default Component.extend({
  isTrulyNone(val) {
    return isNone(val) || isNan(val);
  },

  bboxPoly: computed('bbox', 'bbox.northLatitude',
    'bbox.southLatitude', 'bbox.eastLongitude', 'bbox.westLongitude',
    function() {
      let bbox = this.get('bbox');

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

  bboxPolyObserver: observer('bboxPoly', function() {
    let map = this.get('map');
    let bbox = this.get('bboxPoly');

    if(map && bbox) {
      this.setupMap({
        target: map
      });
    }
  }),

  bbox: alias('extent.geographicExtent.0.boundingBox'),
  geographicElement: alias('extent.geographicExtent.0.geographicElement'),
  showMap: or('bboxPoly', 'geographicElement'),
  setupMap(m) {
    let map = m.target;
    let geo = this.get('geographicElement') || [];
    let bbox = this.get('bboxPoly');
    let features;

    features = bbox ? geo.concat([L.rectangle(bbox).toGeoJSON()]) : [].concat(
      geo);

    let bounds = L.geoJson(features).getBounds();

    map.fitBounds(bounds);

    this.set('map', map);
  },
  actions: {
    calculateBox() {
      let geo = this.get('geographicElement');

      if(!(geo && geo.length)) {
        return null;
      }

      let bounds = L.geoJson(geo).getBounds();
      let bbox = this.get('bbox');

      setProperties(bbox, {
        northLatitude: bounds.getNorth(),
        southLatitude: bounds.getSouth(),
        eastLongitude: bounds.getEast(),
        westLongitude: bounds.getWest()
      });
    }
  }
});
