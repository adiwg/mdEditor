import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { copy } from 'mdeditor/utils/copy';

export default class EditController extends Controller {
  @service flashMessages;
  @service settings;

  @action
  async saveRecord() {
    const model = this.model;
    await model.save();
    this.flashMessages.success(`Saved Record: ${model.get('title')}`);
  }

  @action
  cancelRecord() {
    let model = this.model;
    let message = `Cancelled changes to Record: ${model.get('title')}`;

    if (this.get('settings.data.autoSave')) {
      let json = model.get('jsonRevert');

      if (json) {
        model.set('json', JSON.parse(json));

        // Call doCancel method if available (from route's mixin)
        if (this.doCancel) {
          this.doCancel();
        }

        this.flashMessages.warning(message);
      }

      return;
    }

    model.reload().then(() => {
      // Call doCancel method if available (from route's mixin)
      if (this.doCancel) {
        this.doCancel();
      }
      this.flashMessages.warning(message);
    });
  }

  @action
  destroyRecord() {
    let model = this.model;
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Record: ${model.get('title')}`);
      this.transitionToRoute('records');
    });
  }

  @action
  copyRecord() {
    this.flashMessages.success(
      `Copied Record: ${this.model.get('title')}`
    );
    this.transitionToRoute('record.new.id', copy(this.model));
  }
}
