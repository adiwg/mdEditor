import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service settings;
  @service flashMessages;
  @service slider;
  @service spotlight;
  @service router;

  get currentRoute() {
    return this.router.currentRouteName;
  }
}
