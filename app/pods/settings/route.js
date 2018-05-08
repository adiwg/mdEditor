import Route from '@ember/routing/route';
import Setting from 'mdeditor/models/setting';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

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
    },

    resetMdTranslatorAPI(){
      let url = get(Setting,'attributes').get('mdTranslatorAPI').options.defaultValue;
      let model = get(this.controller, 'model');

      model.set('mdTranslatorAPI', url);
    }
  }
});
