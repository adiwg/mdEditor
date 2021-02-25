import classic from 'ember-classic-decorator';
import { map, union } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
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
@classic
export default class CustomProfileService extends Service {
  init() {
    super.init(...arguments);

    this.customProfiles = this.store.peekAll('custom-profile');
  }

  @service
  flashMessages;

  @service
  store;

  @service('profile')
  definitions;

  /**
   * String identifying the active profile
   *
   * @property active
   * @type {String}
   */
  active = null;

  /**
   * Array of all available profiles
   *
   * @property profiles
   * @type {Array}
   * @category computed
   * @required customProfiles,coreProfiles
   */
  @union('customProfiles', 'coreProfiles')
  profiles;

  /**
   * Array of available coreProfile definitions
   *
   * @property coreProfiles
   * @type {Array}
   * @category computed
   * @required definitions.coreProfiles
   */
  @map('definitions.coreProfiles', function (itm) {
    return {
      id: itm.namespace + '.' + itm.identifier,
      title: itm.title,
      description: itm.description,
      definition: itm,
    };
  })
  coreProfiles;

  /**
   * Available profiles mapped by profile id
   *
   * @property mapById
   * @type {Array}
   * @category computed
   * @required profiles.[]
   */
  @computed('profiles.[]')
  get mapById() {
    return this.profiles.reduce(function (map, profile) {
      map[profile.id] = profile;

      return map;
    }, {});
  }

  /**
   * Available profiles mapped by profile alternate id
   *
   * @property mapByAltId
   * @type {Array}
   * @category computed
   * @required profiles.[]
   */
  @computed('profiles.[]')
  get mapByAltId() {
    return this.profiles.reduce(function (map, profile) {
      let alt = get(profile, 'definition.alternateId');

      if (isEmpty(alt)) {
        return map;
      }

      alt.forEach((a) => (map[a] = profile.id));

      return map;
    }, {});
  }

  /**
   * The defaultProfile definition
   *
   * @property defaultProfile
   * @type {Object}
   * @category computed
   * @required mapById
   */
  @computed('mapById')
  get defaultProfile() {
    return this.mapById[defaultProfileId];
  }

  /**
   * The current component profile definition
   *
   * @property activeComponents
   * @type {Object}
   * @category computed
   * @required active
   */
  @computed('active', 'defaultProfile.definition.components')
  get activeComponents() {
    let comp = get(this.getActiveProfile(), 'definition.components');
    return comp || this.defaultProfile.definition.components;
  }

  /**
   * The currently active schemas
   *
   * @property activeSchemas
   * @type {Array}
   * @category computed
   * @required active
   */
  @computed('active')
  get activeSchemas() {
    return this.getActiveProfile().schemas;
  }

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
  }
}
