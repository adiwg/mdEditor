import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

@classic
export default class MdJsonButtonComponent extends Component {
  @service slider;

  tagName = 'button';
  classNames = ['btn'];
  attributeBindings = ['type'];
  type = 'button';

  text = 'Preview JSON';
  icon = 'binoculars';
  hideSlider = true;
  propagateClick = false;

  json = {};

  click(evt) {
    //this.preview = true;
    if(!this.propagateClick) {
      evt.stopPropagation();
    }
    this.showSlider();
  }

  _close() {
    this.preview = false;
    this.hideSlider = true;
  }

  showSlider() {
    let slider = this.slider;

    slider.set('fromName', 'md-slider-json');
    slider.set('onClose', this._close);
    slider.set('context', this);
    slider.toggleSlider(true);
    this.hideSlider = false;
  }

  @action
  close() {
    this._close();
  }

  @action
  showSliderAction() {
    this.showSlider();
  }
}
