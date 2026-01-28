import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MainRoute extends Route {
  @service settings;
  queryParams = {
    scrollTo: true
  };

  model() {
    return this.settings.get('data');
  }

  setScrollTo(scrollTo) {
    this.controller.set('scrollTo', scrollTo || '');
  }

  @action
  setScrollToAction(scrollTo) {
    this.setScrollTo(scrollTo);
  }
}
