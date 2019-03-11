import Component from '@ember/component';
import layout from '../templates/components/leaflet-table-row-actions';

export default Component.extend({
  layout,

  actions: {
    zoomTo(record) {
      this.sendAction('zoomTo', record);
    },
    showForm(record) {
      this.sendAction('showForm', record);
    },
    deleteFeature(record) {
      this.sendAction('deleteFeature', record);
    }
  }
});
