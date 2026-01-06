import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
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
export default class ProfileService extends Service {
  @service flashMessages;
  @service store;

  @tracked profileRecords = [];
  @tracked coreProfiles = [];

  constructor() {
    super(...arguments);
    this.profileRecords = this.store.peekAll('profile');
    this.coreProfiles = [];
  }

  get profiles() {
    return [...this.profileRecords.toArray(), ...this.coreProfiles];
  }

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
  fetchDefinition = task({ drop: true }, async (uri) => {
    try {
      await timeout(1000);
      let response = await request(uri);
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
  });

  /**
   * Task that checks the for updates at each `record.uri`.
   *
   * @method checkForUpdates
   * @param {Array} records Array of records to check
   * @async
   * @return {Promise} The request response
   */
  checkForUpdates = task({ drop: true }, async (records) => {
    await timeout(1000);
    await all(
      records.map((itm) => {
        if (itm.validations.attrs.uri.isInvalid) {
          this.flashMessages.warning(
            `Did not load definition for "${itm.title}". URL is Invalid.`
          );
          return;
        }
        return request(itm.uri)
          .then((response) => {
            // `response` is the data from the server
            if (semver.valid(response.version)) {
              itm.set('remoteVersion', response.version);
            } else {
              throw new Error('Invalid version');
            }
            return response;
          })
          .catch((error) => {
            if (isNotFoundError(error)) {
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
  });
}
