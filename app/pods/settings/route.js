import Ember from 'ember';

const {
  Route,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  settings: service(),
  publish: service(),
  model() {
    // this.get('store').findAll('settings').then(function(settings) {
    //   return settings.get("firstObject");
    // });
    return this.get('settings').get('data');
  },
  actions:{
    clearLocalStorage(){
      window.localStorage.clear();
      this.transitionTo('application');
      window.location.reload();
    },
    save(){
      this.currentRouteModel().save();
    },

    catalogs(){
      return this.get('publish.catalogs');
    }
  }
});
