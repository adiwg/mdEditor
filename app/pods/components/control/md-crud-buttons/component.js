/* eslint-disable ember/closure-actions */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class MdCrudButtons extends Component {
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

  @computed('settings.showDelete', 'allowDelete')
  get showDelete() {
    return isEmpty(this.allowDelete)
      ? this.settings.data.showDelete
      : this.allowDelete;
  }

  @computed('settings.showDelete', 'allowCopy')
  get showCopy() {
    return isEmpty(this.allowCopy)
      ? this.settings.data.showCopy
      : this.allowCopy;
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
