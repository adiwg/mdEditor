import { attr } from '@ember-data/model';
import { Model } from 'ember-pouch';
import { or, alias } from '@ember/object/computed';
import { computed, observer } from '@ember/object';
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

export default Model.extend(Validations, {
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
    this._super(...arguments);

    this.updateSettings;
  },

  uri: attr('string'),
  alias: attr('string'),
  altDescription: attr('string'),
  remoteVersion: attr('string'),
  config: attr('json'),

  title: or('alias', 'config.title'),
  identifier: alias('config.identifier'),
  namespace: alias('config.namespace'),
  description: or('altDescription', 'config.description'),
  localVersion: alias('config.version'),
  components: alias('config.components'),
  nav: alias('config.nav'),
  hasUpdate: computed('localVersion', 'remoteVersion', checkVersion),

  /* eslint-disable ember/no-observers */
  updateSettings: observer('hasDirtyAttributes', 'alias', 'uri',
    'altDescription', 'remoteVersion',
    'config',
    function () {
      if(this.isNew || this.isEmpty || this.isDeleted) {
        return;
      }

      if(this.hasDirtyAttributes) {
        this.set('dateUpdated', new Date());

        once(this, function () {
          this.save();
        });
      }
    })
  /* eslint-enable ember/no-observers */
});
