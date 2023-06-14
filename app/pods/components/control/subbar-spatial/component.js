import Component from '@ember/component';

export default Component.extend({
  actions: {
    zoomAll() {
      this.zoomAll();
    },
    deleteAllFeatures() {
      this.deleteAllFeatures();
    },
    exportGeoJSON() {
      this.exportGeoJSON();
    },
    uploadData() {
      this.uploadData();
    },
    toList() {
      this.toList();
    },
  },
});
