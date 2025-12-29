import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { notEmpty, alias, or } from '@ember/object/computed';
import Model, { attr, hasMany } from '@ember-data/model';
import { once } from '@ember/runloop';
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

@classic
export default class CustomProfile extends Model.extend(Validations) {
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
    super.init(...arguments);

    this.updateSettings;
  }

  @service('profile')
  definitions;

  @attr('string')
  uri;

  @attr('string')
  alias;

  @attr('string')
  title;

  @attr('string')
  description;

  @attr('string')
  profileId;

  @attr({ defaultValue: () => [] })
  thesauri;

  @or('alias', 'title')
  profileTitle;

  @(alias('id').readOnly())
  identifier;

  @(alias('profile.components').readOnly())
  components;

  @hasMany('schemas')
  schemas;

  @computed('profileId')
  get definition() {
    return this.definitions.profiles.findBy('identifier', this.profileId);
  }

  /* eslint-disable ember/no-observers */
  @observes(
    'hasDirtyAttributes',
    'title',
    'uri',
    'alias',
    'description',
    'hasUpdate',
    'schemas.[]',
    'profileId'
  )
  updateSettings() {
    if (this.isNew || this.isEmpty || this.isDeleted) {
      return;
    }

    if (this.hasDirtyAttributes) {
      this.set('dateUpdated', new Date());

      once(this, function () {
        this.save();
      });
    }
  }
  /* eslint-enable ember/no-observers */
}
