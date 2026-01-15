/* global L */
import Component from '@ember/component';
import { or, alias } from '@ember/object/computed';
import { setProperties, observer } from '@ember/object';
import { isNone } from '@ember/utils';
import { once } from '@ember/runloop';
import { action } from '@ember/object';

const { isNaN: isNan } = Number;

export default class MdExtentSpatialComponent extends Component {
  @alias('extent.geographicExtent.0.boundingBox') bbox;
  @alias('extent.geographicExtent.0') geographicExtent;
  @or(
    'extent.geographicExtent.0.boundingBox.{northLatitude,southLatitude,eastLongitude,westLongitude}'
  )
  hasBbox;
  @alias('extent.geographicExtent.0.geographicElement') geographicElement;
  @or('bboxPoly', 'geographicElement') showMap;

  isTrulyNone(val) {
    return isNone(val) || isNan(val);
  }

  get bboxPoly() {
    let bbox = this.bbox;

    if (!bbox) {
      return null;
    }

    if (
      this.isTrulyNone(bbox.southLatitude) ||
      this.isTrulyNone(bbox.westLongitude) ||
      this.isTrulyNone(bbox.northLatitude) ||
      this.isTrulyNone(bbox.eastLongitude)
    ) {
      return null;
    }

    return [
      [bbox.southLatitude, bbox.westLongitude],
      [bbox.northLatitude, bbox.westLongitude],
      [bbox.northLatitude, bbox.eastLongitude],
      [bbox.southLatitude, bbox.eastLongitude],
    ];
  }

  bboxPolyObserver = observer('bboxPoly', function () {
    let map = this.map;
    let bbox = this.bboxPoly;

    if (map && bbox) {
      this.setupMap({
        target: map,
      });
    }
  });

  setupMap(m) {
    let map = m.target;
    let geo = this.geographicElement || [];
    let bbox = this.bboxPoly;
    let features;

    features = bbox
      ? geo.concat([L.rectangle(bbox).toGeoJSON()])
      : [].concat(geo);

    let bounds = L.geoJson(features).getBounds();

    map.fitBounds(bounds);

    this.map = map;
  }

  deleteFeatures() {
    this.geographicElement = [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let geo = this.extent?.geographicExtent?.[0];

    once(function () {
      geo.boundingBox = geo.boundingBox ?? {};
    });
  }

  @action
  calculateBox() {
    let geo = this.geographicElement;

    if (!(geo && geo.length)) {
      return null;
    }

    let bounds = L.geoJson(geo).getBounds();
    let bbox = this.bbox;

    setProperties(bbox, {
      northLatitude: bounds.getNorth(),
      southLatitude: bounds.getSouth(),
      eastLongitude: bounds.getEast(),
      westLongitude: bounds.getWest(),
    });
  }

  @action
  clearBox() {
    setProperties(this.bbox, {
      northLatitude: null,
      southLatitude: null,
      eastLongitude: null,
      westLongitude: null,
      minimumAltitude: null,
      maximumAltitude: null,
      unitsOfAltitude: null,
    });
  }

  @action
  editFeatures(index) {
    this.editFeatures(index);
  }

  @action
  deleteFeaturesAction() {
    this.deleteFeatures();
  }
}
