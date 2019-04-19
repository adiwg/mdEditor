import Route from '@ember/routing/route';
import Setting from 'mdeditor/models/setting';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  settings: service(),
  publish: service(),
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: service(),

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('links', this.profile.profiles.settings.secondaryNav)
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
