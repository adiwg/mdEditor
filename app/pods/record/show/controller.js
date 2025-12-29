import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { copy } from 'mdeditor/utils/copy';

export default class ShowController extends Controller {
  @service flashMessages;

  @action
  copyRecord() {
    this.flashMessages.success(
      `Copied Record: ${this.model.get('title')}`
    );
    this.transitionToRoute('record.new.id', copy(this.model));
  }
}
