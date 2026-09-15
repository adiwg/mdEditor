import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service settings;
  @service flashMessages;
  @service slider;
  @service spotlight;
  @service router;

  get currentRoute() {
    return this.router.currentRouteName;
  }

  @action
  dismissSplash() {
    // A bare `mut` here only changes the in-memory value - it relies on
    // setting.js's updateSettings observer to detect the change via
    // hasDirtyAttributes and auto-save it, which fails closed (see
    // services/settings.js's setup() for the full writeup on why that
    // property is unreliable under classic Ember .extend()). Without an
    // explicit save, showSplash reverts to true (its stored value,
    // unchanged) on every fresh boot forever, regardless of lastVersion
    // matching.
    this.settings.data.showSplash = false;
    this.settings.data.save();
  }
}
