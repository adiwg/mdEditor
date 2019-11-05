import Service from '@ember/service';
import {
  inject as service
} from '@ember/service';
import { computed, get } from '@ember/object';
import { union, map } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import config from 'mdeditor/config/environment';

const {
  APP: {
    defaultProfileId
  }
} = config;

/**
 * Custom Profile service
 *
 * Service that provides custom profile configurations.
 *
 * @module
 * @augments ember/Service
 */
export default Service.extend({
  init() {
    this._super(...arguments);

    this.customProfiles = this.get('store').peekAll('custom-profile');
  },
  flashMessages: service(),
  store: service(),
  definitions: service('profile'),

  /**
   * String identifying the active profile
   *
   * @type {?String}
   */
  active: null,

  profiles: union('customProfiles', 'coreProfiles'),
  coreProfiles: map('definitions.coreProfiles', function (itm) {
    return {
      id: itm.namespace + '.' + itm.identifier,
      title: itm.title,
      description: itm.description,
      definition: itm
    }
  }),
  mapById: computed('profiles.[]', function () {
    return this.profiles.reduce(function (map, profile) {
      map[profile.id] = profile;

      return map;
    }, {});
  }),
  mapByAltId: computed('profiles.[]', function () {
    return this.profiles.reduce(function (map, profile) {
      let alt = get(profile, 'definition.alternateId');

      if(isEmpty(alt)) {
        return map;
      }

      alt.forEach(a => map[a] = profile.id);

      return map;
    }, {});
  }),
  defaultProfile: computed('mapById', function () {
    return this.mapById[defaultProfileId];
  }),
  activeComponents: computed('active', function () {
    let comp = get(this.getActiveProfile(), 'definition.components');
    return comp || this.defaultProfile.definition.components;
  }),
  activeSchemas: computed('active', function () {
    return this.getActiveProfile().schemas;
  }),

  /**
   * Get the active profile.
   *
   * @function
   * @returns {Object}
   */
  getActiveProfile() {
    const active = this.active;
    const profile = active && typeof active === 'string' ? active :
      defaultProfileId;
    const selected = this.mapById[profile];

    if(selected) {
      return selected;
    }

    const alternate = this.mapById[this.mapByAltId[profile]];

    if(alternate) {
      this.flashMessages
        .info(
          `"${active}" identified as an alternate profile. Using "${alternate.title}" profile. To make this permanent, select "${alternate.title}" from the Profile list.`, {
            sticky: true
          }
        );

      return alternate;
    }

    this.flashMessages
      .warning(`Profile "${active}" not found. Using default profile.`, {
        sticky: true
      });

    return this.defaultProfile;
  }
});
