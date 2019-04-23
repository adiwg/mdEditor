import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';
import {
  once
} from '@ember/runloop';
import {
  getOwner
} from '@ember/application';

export default Route.extend(HashPoll, {
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: service(),

  /**
   * The route activate hook, sets the profile to 'dictionary'.
   */
  activate() {
    this.profile
      .set('active', 'dictionary');
  },

  actions: {
    saveDictionary: function () {
      let model = this.currentRouteModel();

      model
        .save()
        .then(() => {
          //this.refresh();
          //this.setModelHash();
          this.flashMessages
            .success(`Saved Dictionary: ${model.get('title')}`);

          //this.transitionTo('contacts');
        });
    },
    cancelDictionary: function () {
      let model = this.currentRouteModel();
      let message =
        `Cancelled changes to Dictionary: ${model.get('title')}`;
      let controller = this.controller;
      let same = !controller.cancelScope || getOwner(this)
        .lookup('controller:application')
        .currentPath === get(controller,'cancelScope.routeName');

      if(this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if(json) {
          model.set('json', JSON.parse(json));

          if(controller.onCancel) {
            once(() => {
              if(same) {
                controller.onCancel.call(controller.cancelScope ||
                  this);
              }
              this.refresh();
              controller.set('onCancel', null);
              controller.set('cancelScope', null);
            });
          }

          this.flashMessages
            .warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          if(controller.onCancel) {
            once(() => {
              if(same) {
                controller.onCancel.call(controller.cancelScope ||
                  this);
              }
              this.refresh();
              controller.set('onCancel', null);
              controller.set('cancelScope', null);
            });
          }
          this.flashMessages
            .warning(message);
        });
    },
  }
});
