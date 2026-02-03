import Service, { inject as service } from '@ember/service';
import {
  observer
} from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SliderService extends Service {
  @service router;

  @tracked showSlider = false;
  @tracked fromName = 'md-slider-content';

  constructor() {
    super(...arguments);
    this.router.currentRouteName;
  }

  routeObserver = observer('router.currentRouteName', function () {
    this.toggleSlider(false);
    this.fromName = 'md-slider-content';
  });

  @action
  onClose() {
    this.toggleSlider(false);
    this.fromName = 'md-slider-content';
  }

  @action
  toggleSlider(state) {
    if (state === undefined) {
      this.showSlider = !this.showSlider;
      return;
    }

    this.showSlider = !!state;
  }
}
