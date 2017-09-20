import Ember from 'ember';
import config from 'mdeditor/config/environment';

const {
  APP: {
    version
  },
  environment
} = config;

const {
  Service,
  getWithDefault,
  inject,
  set
} = Ember;

export default Service.extend({
  store: inject.service(),
  data: 'null',

  init() {
    this._super(...arguments);

    this.setup();
  },
  setup() {
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

        set(settings, 'repositoryDefaults', getWithDefault(settings,
          'repositoryDefaults', []));

        if(!(me.get('isDestroyed') || me.get('isDestroying'))) {
          me.set('data', settings);
        }
      });
  },
  repositoryTemplate: Ember.Object.extend({
    init() {
      this._super(...arguments);
    }
  })
});
