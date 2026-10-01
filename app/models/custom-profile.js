import Model, { attr, hasMany } from '@ember-data/model';
import { computed, observer } from '@ember/object';
import { or, alias, notEmpty } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

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
  alias: validator('presence', {
    presence: true,
    ignoreBlank: true,
    disabled: notEmpty('model.title'),
    message: 'A title must be provided.',
  }),
  title: validator('presence', {
    presence: true,
    ignoreBlank: true,
    disabled: notEmpty('model.Alias'),
    message: 'A title must be provided.',
  }),
  profileId: validator('presence', {
    presence: true,
    ignoreBlank: true,
    isWarning: true,
    message: 'No profile definition is assigned.',
  }),
  schemas: validator('presence', {
    presence: true,
    ignoreBlank: true,
    isWarning: true,
    message: 'No schemas have been assigned.',
  }),
});

export default Model.extend(Validations, {
  /**
   * Custom Profile model
   *
   * @class custom-profile
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    this._super(...arguments);

    this.updateSettings;
  },

  definitions: service('profile'),

  uri: attr('string'),
  alias: attr('string'),
  title: attr('string'),
  description: attr('string'),
  profileId: attr('string'),
  thesauri: attr({ defaultValue: () => [] }),

  profileTitle: or('alias', 'title'),
  identifier: alias('id').readOnly(),
  components: alias('profile.components').readOnly(),
  schemas: hasMany('schema', { async: false, inverse: null }),
  definition: computed('profileId', function () {
    return this.definitions.profiles.findBy('identifier', this.profileId);
  }),

  /* eslint-disable ember/no-observers */
  updateSettings: observer(
    'hasDirtyAttributes',
    'title',
    'uri',
    'alias',
    'description',
    'hasUpdate',
    'schemas.[]',
    'profileId',
    // See setting.js's updateSettings for why this is deferred + guarded
    // (native hasDirtyAttributes can throw under classic Ember .extend()).
    function () {
      once(this, function () {
        if (this.isNew || this.isEmpty || this.isDeleted) {
          return;
        }

        let dirty = false;

        try {
          dirty = this.hasDirtyAttributes;
        } catch (e) {
          // ignore - see setting.js's updateSettings
        }

        if (dirty) {
          this.set('dateUpdated', new Date());
          this.save();
        }
      });
    }
  ),
  /* eslint-enable ember/no-observers */
});
