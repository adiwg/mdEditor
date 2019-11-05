import Service from '@ember/service';
import Ember from 'ember';
import {
  inject as service
} from '@ember/service';
import request from 'ember-ajax/request';
import { task, all, timeout } from 'ember-concurrency';
// import { computed } from '@ember/object';
import { union } from '@ember/object/computed';
import {
  // isAjaxError,
  isNotFoundError,
  // isForbiddenError
} from 'ember-ajax/errors';
import semver from 'semver';
import mdprofiles from 'mdprofiles';

Ember.libraries.register('mdProfiles', mdprofiles.version);

const coreProfiles = mdprofiles.asArray();

/**
 * Profile service
 *
 * Service that provides profile configurations for metadata records.
 *
 * @module
 * @augments ember/Service
 */
export default Service.extend({
  // profiles: computed('profileRecords.[]', function () {
  //   return this.profileRecords;
  // }),
  profiles: union('profileRecords', 'coreProfiles'),
  // mapById: computed('profiles.[]', function () {
  //   return this.profiles.reduce(function (map, profile) {
  //     map[profile.identifier] = profile;
  //
  //     return map;
  //   }, {});
  // }),
  init() {
    this._super(...arguments);

    this.profileRecords = this.store.peekAll('profile');
    //this.customProfiles = this.get('store').peekAll('custom-profile');
    this.coreProfiles = coreProfiles;
  },
  flashMessages: service(),
  store: service(),
  /**
   * String identifying the active profile
   *
   * @type {?String}
   */
  // active: null,

  // activeComponents: computed('active', function () {
  //   return this.getActiveProfile().components;
  // }),
  // /**
  //  * Get the active profile.
  //  *
  //  * @function
  //  * @returns {Object}
  //  */
  // getActiveProfile() {
  //   const active = this.active;
  //   const profile = active && typeof active === 'string' ? active : 'full';
  //   const selected = this.mapById[profile];
  //
  //   if(selected) {
  //     return selected;
  //   }
  //
  //   this.flashMessages
  //     .warning(`Profile "${active}" not found. Using "full" profile.`);
  //
  //   return this.mapById.full;
  // },

  // /**
  //  * An object defining the available profiles
  //  *
  //  * @type {Object} profiles
  //  */

  fetchDefinition: task(function* (uri) {
    try {
      yield timeout(1000);

      let response = yield request(uri);

      if(response && !semver.valid(response.version)) {
        throw new Error("Invalid version");
      }

      return response;
    } catch (error) {
      if(isNotFoundError(error)) {
        this.flashMessages
          .danger(
            `Could not load profile definition from ${uri}. Definition not found.`
          );
      } else {
        this.flashMessages
          .danger(
            `Could not load profile definition from "${uri}". Error: ${error.message}`
          );
      }
    }
  }).drop(),

  checkForUpdates: task(function* (records) {
    yield timeout(1000);

    yield all(records.map(itm => {
      if(itm.validations.attrs.uri.isInvalid) {
        this.flashMessages
          .warning(
            `Did not load definition for "${itm.title}". URL is Invalid.`
          );
        return;
      }

      return request(itm.uri).then(response => {
        // `response` is the data from the server
        if(semver.valid(response.version)) {
          itm.set('remoteVersion', response.version);
        } else {
          throw new Error("Invalid version");
        }

        return response;
      }).catch(error => {
        if(isNotFoundError(error)) {
          this.flashMessages
            .danger(
              `Could not load definition for "${itm.title}". Definition not found.`
            );
        } else {
          this.flashMessages
            .danger(
              `Could not load definition for "${itm.title}". Error: ${error.message}`
            );
        }
      });
    }));
  }).drop(),
});
