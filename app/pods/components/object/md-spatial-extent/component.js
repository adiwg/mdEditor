import Ember from 'ember';
/* global L */

const {
  Component,
  computed,
  computed: {
    alias,
    or
  },
  setProperties,
  isNone,set
} = Ember;

export default Component.extend({
  bboxPoly: computed('bbox', 'bbox.northLatitude',
    'bbox.southLatitude', 'bbox.eastLongitude', 'bbox.westLongitude',
    function() {
      let bbox = this.get('bbox');

      if(isNone(bbox.southLatitude) || isNone(bbox.westLongitude) ||
          isNone(bbox.northLatitude) || isNone(bbox.eastLongitude)) {
        return null;
      }

      return [
        [bbox.southLatitude, bbox.westLongitude],
        [bbox.northLatitude, bbox.westLongitude],
        [bbox.northLatitude, bbox.eastLongitude],
        [bbox.southLatitude, bbox.eastLongitude]
      ];
    }),
  bbox: alias('extent.geographicExtent.0.boundingBox'),
  geographicElement: alias('extent.geographicExtent.0.geographicElement'),
  showMap: or('bboxPoly', 'geographicElement'),
  setupMap(m) {
    let map = m.target;
    let geo = this.get('geographicElement') || [];
    let bbox = this.get('bboxPoly');
    let features;

    features = bbox ? geo.concat([L.rectangle(bbox).toGeoJSON()]) : [].concat(geo);

    let bounds = L.geoJson(features).getBounds();

    map.fitBounds(bounds);
  },
  actions: {
    calculateBox() {
      let geo = this.get('geographicElement');
      let bounds = L.geoJson(geo).getBounds();
      let bbox = this.get('bbox');

      console.log(bounds);

      setProperties(bbox, {
        northLatitude: bounds.getNorth(),
        southLatitude: bounds.getSouth(),
        eastLongitude: bounds.getEast(),
        westLongitude: bounds.getWest()
      });

      set(bbox,'southLatitude',0);

    }
  }
});
