import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class MainRoute extends Route {
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
