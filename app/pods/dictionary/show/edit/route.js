import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberObject from '@ember/object';
import { scheduleOnce, once } from '@ember/runloop';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';

export default class EditRoute extends Route {
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  @service('custom-profile') profile;

  @service pouch;
  @service hashPoll;
  @service flashMessages;

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    super.afterModel(...arguments);

    this.profile.set('active', model.get('profile'));
    this.hashPoll.startPolling(model);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.hashPoll.stopPolling();
  }
  doCancel() {
    let controller = this.controller;
    let same = !controller.cancelScope || getOwner(this)
      .lookup('controller:application')
      .currentPath === get(controller, 'cancelScope.routeName');

    if(controller.onCancel) {
      once(() => {
        if(same) {
          controller.onCancel.call(controller.cancelScope ||
            this);
        } else {
          controller.set('onCancel', null);
          controller.set('cancelScope', null);
        }
        this.refresh();
      });
    }
  }
    /**
     * Update the dictionary profile
     *
     * @param  {String} profile The new profile.
     */
    async saveDictionary() {
      const model = this.currentRouteModel();
      model.updateTimestamp();
      await model.save();
      this.flashMessages.success(`Saved Dictionary: ${model.get('title')}`);
    }
    cancelDictionary() {
      let model = this.currentRouteModel();
      let message =
        `Cancelled changes to Dictionary: ${model.get('title')}`;

      if(this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if(json) {
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
          this.flashMessages
            .warning(message);
        });
    }
}