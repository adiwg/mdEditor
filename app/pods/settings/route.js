import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Setting from 'mdeditor/models/setting';
import { get, action } from '@ember/object';

@classic
export default class SettingsRoute extends Route {
  @service
  settings;

  @service
  publish;

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  @service
  profile;

  setupController(controller, model) {
    super.setupController(controller, model);

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
  }

  @action
  clearLocalStorage() {
    window.localStorage.clear();
    this.transitionTo('application');
    window.location.reload();
  }

  @action
  save() {
    this.settings.data.save();
  }

  @action
  catalogs() {
    return this.get('publish.catalogs');
  }

  @action
  resetMdTranslatorAPI() {
    let url = get(Setting, 'attributes').get('mdTranslatorAPI').options.defaultValue;
    let model = get(this.controller, 'model');

    model.set('mdTranslatorAPI', url);
  }
}
