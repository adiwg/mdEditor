/**
 * @module mdeditor
 * @submodule components-input
 */

import { action } from '@ember/object';
import Input from '../md-input/component';
import classic from 'ember-classic-decorator';

/**
 * Input, edit, display a single item
 *
 * @class md-input-confirm
 * @extends md-input
 * @constructor
 */
@classic
export default class MdInputConfirmComponent extends Input {
  classNameBindings = ['required'];

  disabled = true;

  get isDisabled() {
    return this.disabled;
  }

  @action
  allowEdit() {
    this.disabled = false;
    this.element.querySelector('input').focus();
  }

  @action
  inputBlur() {
    this.disabled = true;
  }
}
