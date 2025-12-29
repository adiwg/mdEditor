import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import HashPoll from 'mdeditor/mixins/hash-poll';
import DoCancel from 'mdeditor/mixins/cancel';
import RouteExtensionMixin from '../../../../mixins/route-extension';

export default class EditRoute extends Route.extend(
  HashPoll,
  DoCancel,
  RouteExtensionMixin
) {
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  @service('custom-profile') profile;

  @service pouch;
  @service flashMessages;

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    super.afterModel(...arguments);

    this.profile.set('active', model.get('profile'));
  }

  /**
   * Update the dictionary profile
   *
   * @param  {String} profile The new profile.
   */
  setupController(controller, model) {
    super.setupController(controller, model);
    
    // Pass the route instance and doCancel method to controller
    controller.parentRoute = this;
    controller.doCancel = () => this.doCancel();
  }

  @action
  async saveDictionary() {
    const model = this.currentRouteModel();
    model.updateTimestamp();
    await model.save();
    this.flashMessages.success(`Saved Dictionary: ${model.get('title')}`);
  }

  @action
  cancelDictionary() {
    let model = this.currentRouteModel();
    let message = `Cancelled changes to Dictionary: ${model.get('title')}`;

    if (this.get('settings.data.autoSave')) {
      let json = model.get('jsonRevert');

      if (json) {
        model.revertChanges();
        this.doCancel();
        this.flashMessages.warning(message);
      }

      return;
    }

    model
      .reload()
      .then(() => {
        this.doCancel();
        this.flashMessages.warning(message);
      });
  }
}
