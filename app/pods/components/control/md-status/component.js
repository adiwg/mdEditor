import { inject as service } from '@ember/service';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class MdStatusComponent extends Component {
  @service slider;
  @service flashMessages;

  tagName = 'span';
  classNames = ['md-status'];

  /**
   * Model to display status for.
   *
   * @property model
   * @type {DS.model}
   * @required
   */

  isBtn = false;
  hideSlider = false;
  btnSize = 'sm';

  @action
  handleShowSlider() {
    // If a custom showSlider action was passed, use it
    if (this.showSlider && typeof this.showSlider === 'function') {
      this.showSlider();
    } else {
      // Default behavior
      let slider = this.slider;
      slider.fromName = 'md-slider-error';
      slider.toggleSlider(true);
    }
  }

  @action
  saveRecord(evt) {
    let model = this.model;

    if (evt) {
      evt.stopPropagation();
    }
    model.updateTimestamp();
    model.save()
      .then(() => {
        this.flashMessages
          .success(`Saved Record: ${model.get('title')}`);
      });
  }
}
