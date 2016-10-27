import Ember from 'ember';
import config from 'mdeditor/config/environment';

const {
  APP: {
    version
  },
  environment
} = config;

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

        if(settings.get('lastVersion') !== version) {
          settings.set('showSplash', environment !== 'test');
          settings.set('lastVersion', version);
        }

        if ( !(me.get('isDestroyed') || me.get('isDestroying')) ) {
          me.set('data', settings);
        }
      });

  }
});
