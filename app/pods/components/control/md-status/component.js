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

  showSlider() {
    let slider = this.slider;

    slider.fromName = 'md-slider-error';
    slider.toggleSlider(true);
  }

  saveRecord(evt) {
    let model = this.model;

    evt.stopPropagation();
    model.updateTimestamp();
    model.save()
      .then(() => {
        this.flashMessages
          .success(`Saved Record: ${model.get('title')}`);
      });
  }

  actions = {
    showSlider() {
      this.showSlider();
    },

    showSliderAction(evt) {
      this.showSlider(evt);
    },

    saveRecord(evt) {
      this.saveRecord(evt);
    }
  }
}
