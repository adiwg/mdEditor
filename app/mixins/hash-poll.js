/**
 * @module mdeditor
 * @submodule mixins
 */

import {
  inject as service
} from '@ember/service';

import {
  Promise
} from 'rsvp';
import Mixin from '@ember/object/mixin';
import {
  on
} from '@ember/object/evented';
import {
  task,
  timeout
} from 'ember-concurrency';

export const pollInterval = 750; // time in milliseconds

export default Mixin.create({
  settings: service(),

  afterModel(model) {
    this._super(...arguments);

    if(this.get('settings.data.autoSave')) {
      model.set('jsonRevert', model.serialize().data.attributes.json);
    }

    this.pollTask.perform();

    return model;
  },

  deactivatePoll: on('deactivate', function () {
    this.pollTask.cancelAll();
  }),

  poll() {
    const model = this.currentRouteModel();

    return new Promise(function (resolve) {
      if(model) {
        model.notifyPropertyChange('currentHash');
      }
      resolve(true);
    });
  },

  pollTask: task(function* () {
    while(true) {
      yield this.poll();
      yield timeout(pollInterval);
    }
  }).restartable()
});
