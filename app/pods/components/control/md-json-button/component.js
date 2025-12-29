import classic from 'ember-classic-decorator';
import { attributeBindings, classNames, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@ember/component';

@classic
@tagName('button')
@classNames('btn')
@attributeBindings('type')
export default class MdJsonButton extends Component {
  @inject()
  slider;

  type = 'button';
  text = 'Preview JSON';
  icon = 'binoculars';

  @computed
  get json() {
    return {};
  }

  hideSlider = true;
  propagateClick = false;

  click(evt) {
    //this.set('preview', true);
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

    slider.set('fromName', 'md-slider-json');
    slider.set('onClose', this._close);
    slider.set('context', this);
    slider.toggleSlider(true);
    this.set('hideSlider', false);
  }

  @action
  close() {
    this._close;
  }

  @action
  showSlider() {
    this.showSlider();
  }
}
