import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    const store =  this.get('store');

    return store.queryRecord('setting',{}).then(function(settings){
      return !!settings ? settings : store.createRecord('setting');
    });
  },

  actions: {
    exportData() {
      this.get('store').exportData(
        ['records', 'contacts', 'dictionaries', 'settings'], {
          download: true,
          filename: 'test.json'//`my-data-${moment().format('YYYYMMDD-HHMMSS')}.json`
        }
      );
    }
  }
});
