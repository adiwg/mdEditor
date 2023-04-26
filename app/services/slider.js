import Service, { inject as service } from '@ember/service';
import {
  observer
} from '@ember/object';

export default Service.extend({
  init() {
    this._super(...arguments);

    this.get('router.currentRouteName');
  },

  router: service(),

  showSlider: false,
  fromName: 'md-slider-content',

  routeObserver: observer('router.currentRouteName', function () {
    this.toggleSlider(false);
    this.set('fromName', 'md-slider-content');
  }),

  onClose() {},

  toggleSlider(state) {
    if(state === undefined) {
      this.toggleProperty('showSlider');

      return;
    }

    this.set('showSlider', !!state);
  }
});
