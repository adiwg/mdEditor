import classic from 'ember-classic-decorator';
import Service, { inject as service } from '@ember/service';
import EmberObject, { set, get } from '@ember/object';
import config from 'mdeditor/config/environment';
import { defaultValues } from 'mdeditor/models/setting';
import { isEmpty } from '@ember/utils';

const {
  APP: {
    version
  },
  environment
} = config;

@classic
export default class SettingsService extends Service {
  @service
  store;

  data = 'null';

  init() {
    super.init(...arguments);

    this.setup();
  }

  setup() {
    let me = this;
    let settings;
    let store = this.store;

    store
      .findAll('setting')
      .then(function (s) {
        let rec = s.get('firstObject');

        settings = rec ? rec : store.createRecord('setting');

        if(settings.get('lastVersion') !== version) {
          settings.set('showSplash', environment !== 'test');
          settings.set('lastVersion', version);
        }

        set(settings, 'repositoryDefaults', get(settings, 'repositoryDefaults') !== undefined ? get(settings, 'repositoryDefaults') : []);

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
  }

  repositoryTemplate = EmberObject.extend({
    init() {
      super.init(...arguments);
    }
  });
}
