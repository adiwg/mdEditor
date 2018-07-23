import Ember from 'ember';
import config from 'mdeditor/config/environment';
import { defaultValues } from 'mdeditor/models/setting';
import { isEmpty } from '@ember/utils';

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

        //update mdTranslatorAPI if default is being used
        let isDefaultAPI = isEmpty(settings.get('mdTranslatorAPI')) || settings.get('mdTranslatorAPI').match(
          'https://mdtranslator.herokuapp.com/api/v(.)/translator');

        if(isDefaultAPI) {
          settings.set('mdTranslatorAPI', defaultValues.mdTranslatorAPI);
        }

        settings.notifyPropertyChange('hasDirtyAttributes');

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
