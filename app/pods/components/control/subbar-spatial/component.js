import Component from '@ember/component';
import { action } from '@ember/object';

export default class SubbarSpatialComponent extends Component {
  @action
  zoomAll() {
    this.zoomAll();
  }

  @action
  deleteAllFeatures() {
    this.deleteAllFeatures();
  }

  @action
  exportGeoJSON() {
    this.exportGeoJSON();
  }

  @action
  uploadData() {
    this.uploadData();
  }

  @action
  toList() {
    this.toList();
  }
}
