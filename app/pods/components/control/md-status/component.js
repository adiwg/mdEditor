import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  slider: service(),
  tagName: 'span',
  classNames: ['md-status'],


  /**
   * Model to display status for.
   *
   * @property model
   * @type {DS.model}
   * @required
   */

  isBtn: false,
  hideSlider: false,
  btnSize: 'sm',

  showSlider() {
    let slider = this.get('slider');

    slider.set('fromName', 'md-slider-error');
    slider.toggleSlider(true);
  },

  actions: {
    showSlider(evt) {
      this.showSlider(evt);
    },

    saveRecord(evt) {
      let model = this.get('model');

      evt.stopPropagation();
      model.save()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Saved Record: ${model.get('title')}`);
        });
    }
  }
});
