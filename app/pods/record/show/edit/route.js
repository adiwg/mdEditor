import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import HashPoll from 'mdeditor/mixins/hash-poll';
import DoCancel from 'mdeditor/mixins/cancel';
import RouteExtensionMixin from '../../../../mixins/route-extension';

export default class EditRoute extends Route.extend(
  HashPoll,
  DoCancel,
  RouteExtensionMixin
) {
  @service pouch;

  /**
   * The profile service
   * @property profile
   * @return {Ember.Service} profile
   */
  @service('custom-profile') profile;

  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false,
    };
  }

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    super.afterModel(...arguments);

    this.profile.set('active', model.get('profile'));
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    
    // Pass the doCancel method from route to controller
    controller.doCancel = () => this.doCancel();
  }

  @action
  getContext() {
    return this;
  }
}
