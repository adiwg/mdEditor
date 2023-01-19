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
 * @module mdeditor
 * @submodule service
 * @class profile
 */
export default Service.extend({
  init() {
    this._super(...arguments);

    this.profileRecords = this.store.peekAll('profile');
    //this.customProfiles = this.get('store').peekAll('custom-profile');
    this.coreProfiles = coreProfiles;
  },

  profiles: union('profileRecords', 'coreProfiles'),
  flashMessages: service(),
  store: service(),

  /**
   * Task that fetches the definition. Returns a Promise the yields the response.
   *
   * @method fetchDefinition
   * @param {String} uri The uri of the definition
   * @async
   * @return {Promise} The request response
   */
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

  /**
   * Task that checks the for updates at each `record.uri`.
   *
   * @method checkForUpdates
   * @param {Array} records Array of records to check
   * @async
   * @return {Promise} The request response
   */
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
