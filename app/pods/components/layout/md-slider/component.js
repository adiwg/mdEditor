import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class MdSliderComponent extends Component {
  classNames = ['md-slider'];
  classNameBindings = ['visible:in'];
  visible = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (this.visible === true) {
      document.body.classList.add('slider');
    } else {
      document.body.classList.remove('slider');
    }
  }

  fromName = null;

  get name() {
    return this.fromName || 'md-slider-content';
  }

  @action
  toggleVisibility() {
    this.visible = !this.visible;

    if(!this.visible) {
      let context = this.context?.isDestroying;

      this.fromName = null;

      if(!context) {
        this.onClose.call(this);
      }
    }
  }
}
