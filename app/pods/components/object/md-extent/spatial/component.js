import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { alias, or } from '@ember/object/computed';
/* global L */
import Component from '@ember/component';
import {
  set,
  get,
  getWithDefault,
  setProperties,
  action,
  computed,
} from '@ember/object';
import { isNone } from '@ember/utils';
import { once } from '@ember/runloop';

const { isNaN: isNan } = Number;

@classic
export default class Spatial extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let geo = get(this, 'extent.geographicExtent.0');

    once(function () {
      set(geo, 'boundingBox', getWithDefault(geo, 'boundingBox', {}));
    });
  }

  isTrulyNone(val) {
    return isNone(val) || isNan(val);
  }

  @computed('bbox', 'bbox.{northLatitude,southLatitude,eastLongitude,westLongitude}')
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

  @observes('bboxPoly')
  bboxPolyObserver() {
    let map = this.map;
    let bbox = this.bboxPoly;

    if (map && bbox) {
      this.setupMap({
        target: map,
      });
    }
  }

  @alias('extent.geographicExtent.0.boundingBox')
  bbox;

  @alias('extent.geographicExtent.0')
  geographicExtent;

  @or(
    'extent.geographicExtent.0.boundingBox.{northLatitude,southLatitude,eastLongitude,westLongitude}'
  )
  hasBbox;

  @alias('extent.geographicExtent.0.geographicElement')
  geographicElement;

  @or('bboxPoly', 'geographicElement')
  showMap;

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

    this.set('map', map);
  }

  deleteFeatures() {
    this.set('geographicElement', []);
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
  deleteFeatures() {
    this.deleteFeatures();
  }
}
