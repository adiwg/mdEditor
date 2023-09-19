import { union } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import axios from 'axios';
import { isNotFoundError } from 'ember-ajax/errors';
import request from 'ember-ajax/request';
import { all, task, timeout } from 'ember-concurrency';
import ENV from 'mdeditor/config/environment';
import semver from 'semver';

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
  },

  profiles: union('profileRecords', 'coreProfiles'),
  flashMessages: service(),
  store: service(),

  loadProfiles: task(function* () {
    this.coreProfiles = [];
    if (ENV.profilesBaseUrl) {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const secondaryUrl = urlParams.get('loadProfilesFrom');
        const profilesListUrl = `${ENV.profilesBaseUrl}${ENV.manifestPath}`;
        let profilesListResponse = yield axios.get(profilesListUrl);
        let profilesList = profilesListResponse.data;
        if (secondaryUrl) {
          console.log('found secondary url', secondaryUrl);
          let secondaryProfilesListResponse = yield axios.get(secondaryUrl);
          profilesList = profilesList.concat(secondaryProfilesListResponse.data);
        }
        let promiseArray = [];
        profilesList.forEach((profileItem) => {
          promiseArray.push(axios.get(profileItem.url));
        });
        let responseArray = yield Promise.all(promiseArray);
        for (let response of responseArray) {
          this.coreProfiles.push(response.data);
        }
      } catch (e) {
        // handle error as needed
        console.error(e);
      }
    }
  }).restartable(),

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
          this.flashMessages.danger(`Could not load definition for "${itm.title}". Error: ${error.message}`);
        }
      });
    }));
  }).drop(),
});
