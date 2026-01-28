import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class MdSliderComponent extends Component {
  classNames = ['md-slider'];
  classNameBindings = ['visible:in'];

  // visible is passed in as @visible from the parent
  // fromName is passed in as @fromName from the parent

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (this.visible === true) {
      document.body.classList.add('slider');
    } else {
      document.body.classList.remove('slider');
    }
  }

  @action
  toggleVisibility() {
    // Call the onClose callback which should toggle the slider service
    let context = this.context?.isDestroying;

    if(!context && this.onClose) {
      this.onClose();
    }
  }
}
