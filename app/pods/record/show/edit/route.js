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
  @service pouch;
  @service flashMessages;

  /**
   * The profile service
   * @property profile
   * @return {Ember.Service} profile
   */
  @service('custom-profile') profile;

  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false,
    };
  }

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    super.afterModel(...arguments);

    this.profile.set('active', model.get('profile'));
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    
    // Pass the doCancel method from route to controller
    controller.doCancel = () => this.doCancel();
  }

  @action
  async saveRecord() {
    const model = this.currentRouteModel();
    model.updateTimestamp();
    await model.save();
    this.flashMessages.success(`Saved Record: ${model.get('title')}`);
  }

  @action
  cancelRecord() {
    let model = this.currentRouteModel();
    let message = `Cancelled changes to Record: ${model.get('title')}`;

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

  @action
  getContext() {
    return this;
  }
}
