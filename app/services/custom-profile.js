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
  APP: { defaultProfileId },
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
    this.customProfiles = this.store.findAll('custom-profile');
  },
  flashMessages: service(),
  store: service(),
  definitions: service('profile'),
  keyword: service(),

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
      definition: itm,
    };
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
      if (isEmpty(alt)) {
        return map;
      }
      alt.forEach((a) => (map[a] = profile.id));
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
    const profile =
      active && typeof active === 'string' ? active : defaultProfileId;
    const selected = this.mapById[profile];
    if (selected) {
      return selected;
    }
    const alternate = this.mapById[this.mapByAltId[profile]];
    if (alternate) {
      this.flashMessages.info(
        `"${active}" identified as an alternate profile. Using "${alternate.title}" profile. To make this permanent, select "${alternate.title}" from the Profile list.`,
        {
          sticky: true,
        }
      );
      return alternate;
    }
    this.flashMessages.warning(
      `Profile "${active}" not found. Using default profile.`,
      {
        sticky: true,
      }
    );
    return this.defaultProfile;
  },

  async createNewProfileDefinition(profileConfig, uri) {
    const newDefinition = this.store.createRecord('profile');
    newDefinition.set('config', profileConfig);
    newDefinition.set('uri', uri);
    newDefinition.set('alias', profileConfig.title);
    newDefinition.set('remoteVersion', profileConfig.version);
    await newDefinition.save();
  },

  async createNewCustomProfile(profileConfig) {
    const newProfile = this.store.createRecord('custom-profile');
    newProfile.set('uri', profileConfig.uri || null);
    newProfile.set('alias', profileConfig.title || '');
    newProfile.set('title', profileConfig.title);
    newProfile.set('description', profileConfig.description || '');
    newProfile.set('profileId', profileConfig.identifier);
    newProfile.set('thesauri', profileConfig.thesauri || []);
    await newProfile.save();
  },

  async loadCustomProfilesFromUrl(url) {
    if (!url) return;
    const existingProfileDefinitions = await this.store.findAll('profile');
    const existingIdentifiers = new Set(
      existingProfileDefinitions.map((p) => p.identifier)
    );
    const existingCustomProfiles = await this.store.findAll('custom-profile');
    const customIdentifiers = new Set(
      existingCustomProfiles.map((p) => p.profileId)
    );
    const response = await axios.get(url);
    const profilesList = response.data;
    if (!profilesList) {
      return;
    }
    const thesauri = [];
    for (const profileItem of profilesList) {
      const definitionResponse = await axios.get(profileItem.url);
      const { data } = definitionResponse;
      if (data?.thesauri?.length > 0) {
        thesauri.push(...data.thesauri);
      }
      const profileDefinitionExists = existingIdentifiers.has(data.identifier);
      const customProfileExists = customIdentifiers.has(data.identifier);
      if (!profileDefinitionExists) {
        await this.createNewProfileDefinition(data, profileItem.url);
        existingIdentifiers.add(data.identifier);
      }
      if (!customProfileExists) {
        await this.createNewCustomProfile(data);
        customIdentifiers.add(data.identifier);
      }
    }
    let uniqueThesauri = thesauri.filter(
      (thesaurus, index, self) =>
        index === self.findIndex((v) => v.url === thesaurus.url)
    );
    uniqueThesauri = uniqueThesauri.filter((thesaurus) => {
      const existingThesaurus = this.keyword.manifest.find(
        (t) => t.url === thesaurus.url
      );
      return !existingThesaurus;
    });
    uniqueThesauri.forEach(async (thesaurus) => {
      const response = await axios.get(thesaurus.url);
      const thesaurusData = response.data;
      thesaurus.identifier = thesaurusData.citation.identifier[0].identifier;
      this.keyword.manifest.push(thesaurus);
      await this.keyword.addThesaurus(thesaurusData);
    });
  },
});
