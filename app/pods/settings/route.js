import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),
  model() {
    // this.get('store').findAll('settings').then(function(settings) {
    //   return settings.get("firstObject");
    // });
    return this.get('settings').get('data');
  }
});
