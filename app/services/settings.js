import Service, { inject as service } from '@ember/service';
import EmberObject, { set, get } from '@ember/object';
import config from 'mdeditor/config/environment';
import { defaultValues } from 'mdeditor/models/setting';
import { isEmpty } from '@ember/utils';

const {
  APP: { version },
  environment,
} = config;

export default Service.extend({
  store: service(),
  data: null,
  _setupPromise: null,

  init() {
    this._super(...arguments);

    this.setup();
  },
  setup() {
    let me = this;
    let store = this.store;

    let promise = store.findAll('setting').then(function (s) {
      let rec = s.get('firstObject');
      let settings = rec ? rec : store.createRecord('setting');

      if (settings.get('lastVersion') !== version) {
        settings.set('showSplash', environment !== 'test');
        settings.set('lastVersion', version);
      }

      set(
        settings,
        'repositoryDefaults',
        get(settings, 'repositoryDefaults') ?? []
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
