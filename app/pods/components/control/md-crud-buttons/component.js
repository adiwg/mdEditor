/* eslint-disable ember/closure-actions */
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

@classic
export default class MdCrudButtonsComponent extends Component {
  classNames = ['md-crud-buttons'];

  @service settings;

  /**
   * Indicates whether to display the "Delete" button. If not defined, defaults
   * to "settings.data.showDelete".
   *
   * @property allowDelete
   * @type {Boolean}
   * @default "settings.showDelete"
   */

  /**
   * Indicates whether to display the "Copy" button. If not defined, defaults to
   * "settings.data.showDelete".
   *
   * @property allowCopy
   * @type {Boolean}
   * @default "settings.showDelete"
   */

  get showDelete() {
    return isEmpty(this.allowDelete) ? this.settings.data.showDelete : this.allowDelete;
  }

  get showCopy() {
    return isEmpty(this.allowCopy) ? this.settings.data.showCopy : this.allowCopy;
  }

  @action
  save() {
    this.doSave();
  }

  @action
  cancel() {
    this.doCancel();
  }

  @action
  delete() {
    this.doDelete();
  }

  @action
  copy() {
    this.doCopy();
  }
}
