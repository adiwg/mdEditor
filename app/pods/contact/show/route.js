import Route from '@ember/routing/route';
import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import EmberObject from '@ember/object';

export default class ContactShowRoute extends Route {
  @service store;
  @service flashMessages;
  @service pouch;

  queryParams = {
    scrollTo: true
  };

  model(params) {
    return this.store.peekRecord('contact', params.contact_id);
  }

  setScrollTo(scrollTo) {
    this.controller.set('scrollTo', scrollTo || '');
  }

  setScrollToAction(scrollTo) {
    this.setScrollTo(scrollTo);
  }

  async saveContact() {
    const model = this.currentRouteModel();
    model.updateTimestamp();
    await model.save();
    await this.pouch.updatePouchRecord(model);
    this.flashMessages.success(`Saved Contact: ${model.get('title')}`);
  }

  destroyContact() {
    let model = this.currentRouteModel();
    model
      .destroyRecord()
      .then(() => {
        this.flashMessages
          .success(`Deleted Contact: ${model.get('title')}`);
        this.replaceWith('contacts');
      });
  }

  cancelContact() {
    let model = this.currentRouteModel();
    let message = `Cancelled changes to Contact: ${model.get('title')}`;

    if (this.get('settings.data.autoSave')) {
      let json = model.get('jsonRevert');

      if (json) {
        model.revertChanges();
        this.flashMessages.warning(message);
      }

      return;
    }

    model
      .reload()
      .then(() => {
        this.flashMessages.warning(message);
      });
  }

  copyContact() {
    this.flashMessages
      .success(`Copied Contact: ${this.currentRouteModel().get('title')}`);
    this.transitionTo('contact.new.id', copy(this.currentRouteModel()));
  }
}
