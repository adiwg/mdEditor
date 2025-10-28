import classic from 'ember-classic-decorator';
import { tracked } from '@glimmer/tracking';
import { union } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import axios from 'axios';
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
@classic
export default class ProfileService extends Service {
  @tracked coreProfiles = [];

  init() {
    super.init(...arguments);
    this.profileRecords = this.store.peekAll('profile');
  }

  @union('profileRecords', 'coreProfiles')
  profiles;

  @service
  flashMessages;

  @service
  store;

  async loadCoreProfiles() {
    if (!ENV.profilesManifestUrl) return;
    try {
      const response = await axios.get(ENV.profilesManifestUrl);
      const profilesList = response.data;
      const promises = profilesList.map((profileItem) =>
        axios.get(profileItem.url)
      );
      const responses = await Promise.all(promises);
      this.coreProfiles = responses.map((response) => response.data);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Task that fetches the definition. Returns a Promise the yields the response.
   *
   * @method fetchDefinition
   * @param {String} uri The uri of the definition
   * @async
   * @return {Promise} The request response
   */
  @(task(function* (uri) {
    try {
      yield timeout(1000);
      let response = yield axios.get(uri).then((res) => res.data);
      if (response && !semver.valid(response.version)) {
        throw new Error('Invalid version');
      }
      return response;
    } catch (error) {
      if (isNotFoundError(error)) {
        this.flashMessages.danger(
          `Could not load profile definition from ${uri}. Definition not found.`
        );
      } else {
        this.flashMessages.danger(
          `Could not load profile definition from "${uri}". Error: ${error.message}`
        );
      }
    }
  }).drop())
  fetchDefinition;

  /**
   * Task that checks the for updates at each `record.uri`.
   *
   * @method checkForUpdates
   * @param {Array} records Array of records to check
   * @async
   * @return {Promise} The request response
   */
  @(task(function* (records) {
    yield timeout(1000);
    yield all(
      records.map((itm) => {
        if (itm.validations.attrs.uri.isInvalid) {
          this.flashMessages.warning(
            `Did not load definition for "${itm.title}". URL is Invalid.`
          );
          return;
        }
        return axios
          .get(itm.uri)
          .then((response) => {
            // `response.data` is the data from the server
            if (semver.valid(response.data.version)) {
              itm.set('remoteVersion', response.data.version);
            } else {
              throw new Error('Invalid version');
            }
            return response.data;
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              this.flashMessages.danger(
                `Could not load definition for "${itm.title}". Definition not found.`
              );
            } else {
              this.flashMessages.danger(
                `Could not load definition for "${itm.title}". Error: ${error.message}`
              );
            }
          });
      })
    );
  }).drop())
  checkForUpdates;
}
