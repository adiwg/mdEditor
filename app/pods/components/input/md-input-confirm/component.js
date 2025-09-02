import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Input from '../md-input/component';

@classic
@classNameBindings('required')
export default class MdInputConfirm extends Input {
  disabled = true;

  @computed('disabled')
  get isDisabled() {
    return this.disabled;
  }

  @action
  allowEdit() {
    this.set('disabled', false);
    this.element.querySelector('input').focus();
  }

  @action
  inputBlur() {
    this.set('disabled', true);
  }
}
