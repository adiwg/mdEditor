import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Model, { attr } from '@ember-data/model';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';

const defaultValues = {
  // itisProxyUrl: 'https://api.sciencebase.gov/mdTranslator',
  // mdTranslatorAPI: 'https://dev-mdtranslator.mdeditor.org/api/v3/translator',
  // itisProxyUrl: 'https://dev-mdtranslator.mdeditor.org',
  fiscalStartMonth: '10',
  publishOptions: [
    {
      publisher: 'ScienceBase',
      publisherEndpoint: '',
      'sb-defaultParent': '',
    },
    {
      publisher: 'CouchDB',
      publisherEndpoint: '',
      'couchdb-database': '',
      'couchdb-username': '',
    },
  ],
};

@classic
class theModel extends Model {
  /**
   * Setting model
   *
   * @class setting
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  @service
  settings;

  init() {
    super.init(...arguments);

    //this.on('didUpdate', this, this.wasUpdated);
    this.on('didLoad', this, this.wasLoaded);
    //this.on('didUpdate', this, this.wasLoaded);
    this.updateSettings;
  }

  //cleaner: inject.service(),
  @attr('boolean', {
    defaultValue: true,
  })
  compressOnSave;

  @attr('boolean', {
    defaultValue: true,
  })
  showSplash;

  @attr('boolean', {
    defaultValue: true,
  })
  keepSettings;

  @attr('boolean', {
    defaultValue: false,
  })
  autoSave;

  @attr('boolean', {
    defaultValue: false,
  })
  showDelete;

  @attr('boolean', {
    defaultValue: false,
  })
  showCopy;

  @attr('string', {
    defaultValue: '',
  })
  lastVersion;

  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  dateUpdated;

  @attr('string', {
    defaultValue: 'UTF-8',
  })
  characterSet;

  @attr('string', {
    defaultValue: 'USA',
  })
  country;

  @attr('string', {
    defaultValue: 'eng',
  })
  language;

  @attr('string', {
    defaultValue: '',
  })
  importUriBase;

  @attr('string')
  mdTranslatorAPI;

  @attr('string')
  itisProxyUrl;

  @attr('string', {
    defaultValue: defaultValues.fiscalStartMonth,
  })
  fiscalStartMonth;

  @attr('json')
  repositoryDefaults;

  @attr('json', {
    defaultValue: function () {
      return defaultValues.publishOptions.slice(); // Return a copy of the default array
    },
  })
  publishOptions;

  @attr('json', {
    defaultValue: function () {
      return [];
    },
  })
  customSchemas;

  @alias('defaultLocale')
  locale;

  wasLoaded() {
    this.settings.setup();
  }

  @observes('hasDirtyAttributes')
  updateSettings() {
    if (this.hasDirtyAttributes) {
      run.once(this, function () {
        this.save();
      });
    }
  }
}

export { defaultValues, theModel as default };
