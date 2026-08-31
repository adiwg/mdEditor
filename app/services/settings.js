import Service, { inject as service } from '@ember/service';
import EmberObject, { set } from '@ember/object';
import config from 'mdeditor/config/environment';

const {
  APP: { version },
  environment,
} = config;

export default Service.extend({
  store: service(),
  data: null,
  _setupPromise: null,

  // Set just before an intentional, already-confirmed reload (e.g. Clear
  // Storage Cache) so the application route's beforeunload guard doesn't
  // show a second, redundant "leave site?" prompt.
  bypassUnloadWarning: false,

  init() {
    this._super(...arguments);

    this.setup();
  },

  // Resolves once the initial settings record has loaded (or been created)
  get ready() {
    return this._setupPromise;
  },

  setup() {
    let me = this;
    let store = this.store;

    let promise = store.findAll('setting').then(function (s) {
      let rec = s.toArray()[0];
      let settings = rec ? rec : store.createRecord('setting');

      if (settings.get('lastVersion') !== version) {
        settings.set('showSplash', environment !== 'test');
        settings.set('lastVersion', version);
      }

      set(
        settings,
        'repositoryDefaults',
        settings.repositoryDefaults ?? []
      );

      settings.notifyPropertyChange('hasDirtyAttributes');

      if (!(me.get('isDestroyed') || me.get('isDestroying'))) {
        me.set('data', settings);
      }

      return settings;
    });

    this.set('_setupPromise', promise);
    return promise;
  },
  repositoryTemplate: EmberObject.extend({
    init() {
      this._super(...arguments);
    },
  }),
});
