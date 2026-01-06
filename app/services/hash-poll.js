/**
 * Hash polling service
 * Polls for changes in the current route model
 *
 * @module mdeditor
 * @submodule services
 */

import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export const pollInterval = 750; // time in milliseconds

export default class HashPollService extends Service {
  @service settings;
  @service router;

  @tracked currentModel = null;

  /**
   * Start polling for the given model
   */
  startPolling(model) {
    this.currentModel = model;

    if (this.settings.data?.autoSave) {
      model.set('jsonRevert', model.serialize().data.attributes.json);
      model.set('dateUpdatedRevert', model.get('dateUpdated'));
    }

    this.pollTask.perform();
  }

  /**
   * Stop polling
   */
  stopPolling() {
    this.pollTask.cancelAll();
    this.currentModel = null;
  }

  poll() {
    const model = this.currentModel;

    if (model) {
      model.notifyPropertyChange('currentHash');
    }

    return Promise.resolve(true);
  }

  pollTask = task({ restartable: true }, async () => {
    while (true) {
      await this.poll();
      await timeout(pollInterval);
    }
  });
}
