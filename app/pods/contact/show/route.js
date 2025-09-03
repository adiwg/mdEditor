import Route from '@ember/routing/route';
import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class ShowRoute extends Route.extend(ScrollTo) {
  @service flashMessages;
  @service pouch;

  model(params) {
    return this.store.peekRecord('contact', params.contact_id);
  }

  @action
  async saveContact() {
    const model = this.currentRouteModel();
    await model.save();
    await this.pouch.updatePouchRecord(model);
    this.flashMessages.success(`Saved Contact: ${model.get('title')}`);
  }

  @action
  destroyContact() {
    let model = this.currentRouteModel();
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Contact: ${model.get('title')}`);
      this.replaceWith('contacts');
    });
  }

  @action
  cancelContact() {
    let model = this.currentRouteModel();
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
  copyContact() {
    this.flashMessages.success(
      `Copied Contact: ${this.currentRouteModel().get('title')}`
    );
    this.transitionTo('contact.new.id', copy(this.currentRouteModel()));
  }
}
