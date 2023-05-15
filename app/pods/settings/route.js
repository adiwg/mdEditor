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

    const links = [{
      title: 'Main',
      target: 'settings.main',
      tip: 'Main application settings'
    }, {
      title: 'Profiles',
      target: 'settings.profile',
      tip: 'Custom profile settings'
    }, {
      title: 'Validation',
      target: 'settings.validation',
      tip: 'Custom validation settings'
    }]
    controller.set('links', links);
  },

  actions: {
    clearLocalStorage() {
      window.localStorage.clear();
      this.transitionTo('application');
      window.location.reload();
    },
    save() {
      this.settings.data.save();
    },

    catalogs() {
      return this.get('publish.catalogs');
    },

    resetMdTranslatorAPI() {
      let url = Setting.attributes.get('mdTranslatorAPI').options.defaultValue;
      let model = this.controller.model;

      model.set('mdTranslatorAPI', url);
    }
  }
});
