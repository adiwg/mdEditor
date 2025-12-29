import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditController extends Controller {
  @service flashMessages;
  @service settings;

  @action
  async saveDictionary() {
    const model = this.model;
    await model.save();
    this.flashMessages.success(`Saved Dictionary: ${model.get('title')}`);
  }

  @action
  cancelDictionary() {
    let model = this.model;
    let message = `Cancelled changes to Dictionary: ${model.get('title')}`;

    if (this.get('settings.data.autoSave')) {
      let json = model.get('jsonRevert');

      if (json) {
        model.set('json', JSON.parse(json));
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
  destroyDictionary() {
    let model = this.model;
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Dictionary: ${model.get('title')}`);
      this.transitionToRoute('dictionaries');
    });
  }

  @action
  copyDictionary() {
    this.flashMessages.success(
      `Copied Dictionary: ${this.model.get('title')}`
    );
    // Import the copy utility
    import('mdeditor/utils/copy').then(({ copy }) => {
      this.transitionToRoute('dictionary.new.id', copy(this.model));
    });
  }

  @action
  getContext() {
    return this.parentRoute;
  }
}
