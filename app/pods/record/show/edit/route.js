import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberObject from '@ember/object';
import { scheduleOnce, once } from '@ember/runloop';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';

export default class EditRoute extends Route {
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false
    };
  }
  @service pouch;
  @service hashPoll;

  /**
   * The profile service
   * @property profile
   * @return {Ember.Service} profile
   */
  @service('custom-profile') profile;

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this._super(...arguments);

    this.profile.set('active', model.get('profile'));
    this.hashPoll.startPolling(model);
  }
  deactivate() {
    this._super(...arguments);
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
    async saveRecord() {
      const model = this.currentRouteModel();
      model.updateTimestamp();
      await model.save();
      this.flashMessages.success(`Saved Record: ${model.get('title')}`);
    }
    cancelRecord() {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Record: ${model.get('title')}`;

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
          this.flashMessages.warning(message);
        });
    }
    getContext() {
      return this;
    }
}