/* eslint-disable ember/no-observers */
import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import Service, { inject as service } from '@ember/service';
import '@ember/object';

@classic
export default class SliderService extends Service {
  init() {
    super.init(...arguments);

    this.router.currentRouteName;
  }

  @service
  router;

  showSlider = false;
  fromName = 'md-slider-content';

  @observes('router.currentRouteName')
  routeObserver() {
    this.toggleSlider(false);
    this.set('fromName', 'md-slider-content');
  }

  onClose() {}

  toggleSlider(state) {
    if (state === undefined) {
      this.toggleProperty('showSlider');

      return;
    }

    this.set('showSlider', !!state);
  }
}
