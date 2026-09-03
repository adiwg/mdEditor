import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberObject from '@ember/object';
import { guidFor } from '@ember/object/internals';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import config from 'mdeditor/config/environment';
import { runPouchMigration } from 'mdeditor/utils/pouch-migration';

const {
  APP: { defaultProfileId },
} = config;

const console = window.console;

export default class ApplicationRoute extends Route {
  @service store;
  @service spotlight;
  @service slider;
  @service router;
  @service keyword;
  @service profile;
  @service('custom-profile') customProfile;
  @service flashMessages;
  @service settings;

  constructor() {
    super(...arguments);

    window.addEventListener('beforeunload', (evt) => {
      if (this.settings.bypassUnloadWarning) {
        return undefined;
      }

      let message = 'Are you sure you want to leave unsaved work?';

      evt.returnValue = this.hasUnsavedChanges() ? message : undefined;

      return evt.returnValue;
    });
  }

  hasUnsavedChanges() {
    return this.currentRouteModel().some(
      (itm) => itm.filter((record) => record.hasDirtyHash).length
    );
  }

  /**
   * Models for sidebar navigation
   *
   * @return {Ember.RSVP.hash}
   */
  model() {
    let promises = [
      this.store.findAll('record', {
        reload: true,
      }),
      this.store.findAll('contact', {
        reload: true,
      }),
      this.store.findAll('dictionary', {
        reload: true,
      }),
    ];

    let meta = A([
      EmberObject.create({
        type: 'record',
        list: 'records',
        title: 'Metadata Records',
        icon: 'file-o',
      }),
      EmberObject.create({
        type: 'contact',
        list: 'contacts',
        title: 'Contacts',
        icon: 'users',
      }),
      EmberObject.create({
        type: 'dictionary',
        list: 'dictionaries',
        title: 'Dictionaries',
        icon: 'book',
      }),
    ]);

    // findAll()'s result is a reactive array that rejects arbitrary property
    // writes (e.g. `item.meta = ...`), so the per-type nav metadata is
    // carried alongside the list in a wrapper object instead of being glued
    // onto the array itself. Consumers use `.list` for the record array and
    // `.meta` for the {type, list, title, icon, listId} descriptor.
    let mapFn = function (item, id) {
      meta[id].set('listId', guidFor(item));

      return EmberObject.create({
        list: item,
        meta: meta[id],
      });
    };

    return RSVP.map(promises, mapFn).then((result) => {
      let profiles = [
        this.store.findAll('profile', {
          reload: true,
        }),
        this.store.findAll('schema', {
          reload: true,
        }),
        this.store.findAll('custom-profile', {
          reload: true,
        }),
      ];

      return RSVP.all(profiles).then(() => result);

      // return result;
    });
  }

  async beforeModel() {
    if (!defaultProfileId) {
      this.router.replaceWith('error').then(function (route) {
        route.controller.set(
          'lastError',
          new Error(
            'A default profile ID is not set in "config/environment/APP"'
          )
        );
      });
    }

    // Must finish before model()'s findAll('record'/'contact'/'dictionary')
    // calls below, since those now read straight from the Pouch db this
    // migrates old localStorage-backed data into.
    await runPouchMigration(this.store);

    const loadThesauriPromise = this.keyword.loadThesauri();
    const loadProfilesPromise = this.profile.loadCoreProfiles();
    return Promise.all([loadThesauriPromise, loadProfilesPromise]);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }

  /**
   * The current model for the route
   * @method currentRouteModel
   * @return {Object}
   */

  @action
  error(error) {
    console.error(error);

    if (error.status === 404) {
      return this.router.transitionTo('not-found');
    }

    return this.router.replaceWith('error').then(function (route) {
      route.controller.set('lastError', error);
    });
  }

  @action
  didTransition() {
    // currentRoute is now a getter on the controller that reads from router.currentRouteName
  }
}
