import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { copy } from 'mdeditor/utils/copy';

@classic
export default class EditController extends Controller {
  @service flashMessages;
  @service pouch;
  @service('settings') settings;

  @action
  async saveContact() {
    const model = this.model;
    await model.save();
    await this.pouch.updatePouchRecord(model);
    this.flashMessages.success(`Saved Contact: ${model.get('title')}`);
  }

  @action
  cancelContact() {
    let model = this.model;
    let message = `Cancelled changes to Contact: ${model.get('title')}`;

    if (this.get('settings.data.autoSave')) {
      let json = model.get('jsonRevert');

      if (json) {
        model.set('json', JSON.parse(json));
        this.flashMessages.warning(message);
      }

      return;
    }

    model.reload().then(() => {
      this.flashMessages.warning(message);
    });
  }

  @action
  async destroyContact() {
    let model = this.model;
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Contact: ${model.get('title')}`);
      this.transitionToRoute('contacts');
    });
  }

  @action
  copyContact() {
    this.flashMessages.success(
      `Copied Contact: ${this.model.get('title')}`
    );
    this.transitionToRoute('contact.new.id', copy(this.model));
  }

  @action
  cancelTransition() {
    // Handle cancel transition logic
    this.set('pausedTransition', null);
  }

  @action
  confirmTransition() {
    // Handle confirm transition logic
    let pausedTransition = this.get('pausedTransition');
    if (pausedTransition) {
      pausedTransition.retry();
      this.set('pausedTransition', null);
    }
  }
}
