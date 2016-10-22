import Ember from 'ember';
import config from 'mdeditor/config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  data: 'null',

  init() {
    this._super(...arguments);

    let me = this;
    let settings;
    let store = this.get('store');

    store
      .findAll('setting')
      .then(function (s) {
        let rec = s.get('firstObject');

        settings = rec ? rec : store.createRecord('setting');

        if(settings.get('lastVersion') !== config.APP.version) {
          settings.set('showSplash', true);
          settings.set('lastVersion', config.APP.version);
        }
        me.set('data', settings);
      });

  }
});
