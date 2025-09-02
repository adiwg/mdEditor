import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import { alias, or } from '@ember/object/computed';
import Model, { attr } from '@ember-data/model';
import { once } from '@ember/runloop';
import { checkVersion, regex } from 'mdeditor/models/schema'
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

// [{
//   "id": "full",
//   "namespace": "org.adiwg.profile",
//   "alternateId": [""],
//   "title": "Full",
//   "description": "Evey supported component",
//   "version": "0.0.0",
//   "components": {
//     "record": {},
//     "contact": {},
//     "dictionary": {}
//   },
//   "nav": {
//     "record": [{
//       "title": "",
//       "target": "",
//       "tip": ""
//     }]
//   }
// }]

const Validations = buildValidations({
  'config': validator(
    'presence', {
      presence: true,
      ignoreBlank: true,
      message: 'The definition has not been downloaded.'
    }),
  'uri': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('format', {
      regex: regex,
      isWarning: false,
      message: 'This field should be a valid, resolvable URL.'
    })
  ]
});

@classic
export default class Profile extends Model.extend(Validations) {
  /**
   * Profile model
   *
   * @class profile
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    super.init(...arguments);

    this.updateSettings;
  }

  @attr('string')
  uri;

  @attr('string')
  alias;

  @attr('string')
  altDescription;

  @attr('string')
  remoteVersion;

  @attr('json')
  config;

  @or('alias', 'config.title')
  title;

  @alias('config.identifier')
  identifier;

  @alias('config.namespace')
  namespace;

  @or('altDescription', 'config.description')
  description;

  @alias('config.version')
  localVersion;

  @alias('config.components')
  components;

  @alias('config.nav')
  nav;

  @computed('localVersion', 'remoteVersion')
  get hasUpdate() {
    return checkVersion.call(this);
  }

  /* eslint-disable ember/no-observers */
  @observes(
    'hasDirtyAttributes',
    'alias',
    'uri',
    'altDescription',
    'remoteVersion',
    'config'
  )
  updateSettings() {
    if(this.isNew || this.isEmpty || this.isDeleted) {
      return;
    }

    if(this.hasDirtyAttributes) {
      this.set('dateUpdated', new Date());

      once(this, function () {
        this.save();
      });
    }
  }
  /* eslint-enable ember/no-observers */
}
