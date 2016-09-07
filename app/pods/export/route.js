import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  /*model() {
    return Ember.Object.create({
      compress: true
    });
  },*/
compress: true,

  actions: {
    exportData() {
      this.get('store').exportData(
        ['records', 'contacts', 'dictionaries'], {
          download: true,
          filename: `my-data-${moment(Date()).format('YYYYMMDD-HHMMSS')}.json`
        }
      );
    },
    toggleCompress() {
      this.toggleProperty('compress');
    }
  }
});
