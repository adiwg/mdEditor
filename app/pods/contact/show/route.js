/* eslint-disable ember/no-mixins */
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { copy } from 'ember-copy';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class ShowRoute extends Route.extend(ScrollTo) {
  @service
  flashMessages;

  model(params) {
    let rec = this.store.peekRecord('contact', params.contact_id);
    return rec;
  }

  @action
  saveContact() {
    let model = this.currentRouteModel();

    model.save().then(() => {
      //this.refresh();
      //this.setModelHash();
      this.flashMessages.success(`Saved Contact: ${model.get('title')}`);

      //this.transitionTo('contacts');
    });
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

    if (this.settings.data.autoSave) {
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