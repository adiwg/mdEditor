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
    if (this._setupPromise) {
      return this._setupPromise;
    }

    let me = this;
    let store = this.store;

    // Deferred to a microtask so `this._setupPromise` (set below, before
    // this runs) is already in place if something reentrantly calls setup()
    // while findAll's schema/adapter resolution is still on the stack -
    // ember-pouch is a synchronous, local adapter, so that resolution can
    // nest within a single call stack rather than crossing a real I/O wait.
    let promise = Promise.resolve()
      .then(() => store.findAll('setting'))
      .then(function (s) {
      let rec = s[0];
      let settings = rec ? rec : store.createRecord('setting');

      if (settings.get('lastVersion') !== version) {
        settings.set('showSplash', environment !== 'test');
        settings.set('lastVersion', version);

        // Explicit save, matching settings/route.js's own save action
        // (this.settings.data.save()) - don't rely on setting.js's
        // updateSettings observer to auto-detect and save this via
        // hasDirtyAttributes. That property is backed by ember-data 5.x's
        // warp-drive machinery, which can throw under classic Ember
        // .extend() (see models/setting.js's updateSettings for the full
        // writeup); the observer fails closed on that throw, so this
        // write was silently never persisting - showSplash reverting to
        // true and the Update Alert reappearing on every fresh boot,
        // forever, since lastVersion never actually committed either.
        settings.save();
      }

      set(
        settings,
        'repositoryDefaults',
        settings.repositoryDefaults ?? []
      );

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
