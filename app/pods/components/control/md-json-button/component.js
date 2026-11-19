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
    this.set('preview', false);
    this.set('hideSlider', true);
  }

  showSlider() {
    let slider = this.slider;

    slider.fromName = 'md-slider-json';
    slider.customOnClose = this._close.bind(this);
    slider.context = this;
    slider.toggleSlider(true);
    this.set('hideSlider', false);
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
