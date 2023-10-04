import { computed, get } from '@ember/object';
import { map, union } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import axios from 'axios';
import config from 'mdeditor/config/environment';

/**
 * The default profile identifier
 *
 * @property defaultProfileId
 * @type {String}
 * @default "mdeditor.config.environment.config.defaultProfileId"
 * @static
 * @readOnly
 */
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
 * @module mdeditor
 * @submodule service
 * @class custom-profile
 */
export default Service.extend({
  init() {
    this._super(...arguments);
    this.customProfiles = this.store.peekAll('custom-profile');
  },
  flashMessages: service(),
  store: service(),
  definitions: service('profile'),

  /**
   * String identifying the active profile
   *
   * @property active
   * @type {String}
   */
  active: null,

  /**
   * Array of all available profiles
   *
   * @property profiles
   * @type {Array}
   * @category computed
   * @required customProfiles,coreProfiles
   */
  profiles: union('customProfiles', 'coreProfiles'),

  /**
   * Array of available coreProfile definitions
   *
   * @property coreProfiles
   * @type {Array}
   * @category computed
   * @required definitions.coreProfiles
   */
  coreProfiles: map('definitions.coreProfiles', function (itm) {
    return {
      id: itm.namespace + '.' + itm.identifier,
      title: itm.title,
      description: itm.description,
      definition: itm
    }
  }),

  /**
   * Available profiles mapped by profile id
   *
   * @property mapById
   * @type {Array}
   * @category computed
   * @required profiles.[]
   */
  mapById: computed('profiles.[]', function () {
    return this.profiles.reduce(function (map, profile) {
      map[profile.id] = profile;
      return map;
    }, {});
  }),

  /**
   * Available profiles mapped by profile alternate id
   *
   * @property mapByAltId
   * @type {Array}
   * @category computed
   * @required profiles.[]
   */
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

  /**
   * The defaultProfile definition
   *
   * @property defaultProfile
   * @type {Object}
   * @category computed
   * @required mapById
   */
  defaultProfile: computed('mapById', function () {
    return this.mapById[defaultProfileId];
  }),

  /**
   * The current component profile definition
   *
   * @property activeComponents
   * @type {Object}
   * @category computed
   * @required active
   */
  activeComponents: computed('active', function () {
    let comp = get(this.getActiveProfile(), 'definition.components');
    return comp || this.defaultProfile.definition.components;
  }),

  /**
   * The currently active schemas
   *
   * @property activeSchemas
   * @type {Array}
   * @category computed
   * @required active
   */
  activeSchemas: computed('active', function () {
    return this.getActiveProfile().schemas;
  }),

  /**
   * Get the active profile.
   *
   * @method getActiveProfile
   * @return {Object} The profile definition
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
  },

  async loadCustomProfilesFromUrl(url) {
    if (!url) {
      console.log('no url');
      return;
    }
    const existingProfileDefinitions = await this.store.findAll('profile');
    const existingIdentifiers = new Set(existingProfileDefinitions.map(p => p.identifier));
    const existingCustomProfiles = await this.store.findAll('custom-profile');
    const customIdentifiers = new Set(existingCustomProfiles.map(p => p.profileId));
    const response = await axios.get(url);
    if (!response.data) {
      console.log('no data');
      return;
    }
    const profilesList = response.data;
    for (const profileItem of profilesList) {
      const definitionResponse = await axios.get(profileItem.url);
      const { data } = definitionResponse;
      let profileDefinitionExists = existingIdentifiers.has(data.identifier);
      let customProfileExists = customIdentifiers.has(data.identifier);
      if (!profileDefinitionExists) {
        const newDefinition = this.store.createRecord('profile');
        newDefinition.set('config', data);
        newDefinition.set('uri', profileItem.url);
        newDefinition.set('alias', data.title);
        newDefinition.set('remoteVersion', data.version);
        await newDefinition.save();
        existingIdentifiers.add(data.identifier);
      }
      if (!customProfileExists) {
        const newProfile = this.store.createRecord('custom-profile');
        newProfile.set('config', data);
        newProfile.set('profileId', data.identifier);
        await newProfile.save();
      }
    }
  },

  async loadProfilesFromQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const secondaryUrl = urlParams.get('loadProfilesFrom');
    return await this.loadCustomProfilesFromUrl(secondaryUrl);
  }
});
