import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { copy } from 'mdeditor/utils/copy';

@classic
export default class IndexController extends Controller {
  @service flashMessages;
  @service pouch;

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
  setScrollTo(scrollTarget) {
    this.set('scrollTo', scrollTarget);
  }
}
