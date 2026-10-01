import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { once } from '@ember/runloop';
import { getOwner } from '@ember/application';

export default class EditRoute extends Route {
  constructor() {
    super(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false,
    };
  }
  @service pouch;
  @service hashPoll;
  @service flashMessages;
  @service settings;

  /**
   * The profile service
   * @property profile
   * @return {Ember.Service} profile
   */
  @service('custom-profile') profile;

  model() {
    return this.modelFor('record.show');
  }

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    super.afterModel(...arguments);

    if (model) {
      this.profile.set('active', model.get('profile'));
      this.hashPoll.startPolling(model);
    }
  }
  deactivate() {
    super.deactivate(...arguments);
    this.hashPoll.stopPolling();
  }
  doCancel() {
    let controller = this.controller;
    let owner = getOwner(this);
    let same =
      !controller.cancelScope ||
      (owner &&
        !owner.isDestroying &&
        !owner.isDestroyed &&
        owner.lookup('controller:application').currentPath ===
          controller.cancelScope.routeName);

    if (controller.onCancel) {
      once(() => {
        if (same) {
          controller.onCancel.call(controller.cancelScope || this);
        } else {
          controller.set('onCancel', null);
          controller.set('cancelScope', null);
        }
        this.refresh();
      });
    }
  }
  @action
  async saveRecord() {
    const model = this.currentRouteModel();
    model.updateTimestamp();
    await model.save();
    let json = model.cleanJson;

    model.setCurrentHash(json);
    model.notifyPropertyChange('currentHash');
    model.notifyPropertyChange('hasDirtyHash');
    this.flashMessages.success(`Saved Record: ${model.get('title')}`);
  }

  @action
  cancelRecord() {
    let model = this.currentRouteModel();
    let message = `Cancelled changes to Record: ${model.get('title')}`;

    if (this.settings.data?.autoSave) {
      let json = model.get('jsonRevert');

      if (json) {
        model.revertChanges();
        this.doCancel();
        this.flashMessages.warning(message);
      }

      return;
    }

    model.reload().then(() => {
      this.doCancel();
      this.flashMessages.warning(message);
    });
  }

  @action
  getContext() {
    return this;
  }
}
