import Ember from 'ember';
import layout from '../templates/components/leaflet-table-row-actions';

export default Ember.Component.extend({
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
