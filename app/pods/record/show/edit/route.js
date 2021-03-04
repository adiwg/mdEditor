import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';
import DoCancel from 'mdeditor/mixins/cancel';

@classic
export default class EditRoute extends Route.extend(HashPoll, DoCancel) {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Edit',
      linkable: false,
    };
  }

  /**
   * The profile service
   * @property profile
   * @return {Ember.Service} profile
   */
  @service('custom-profile')
  profile;

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    super.afterModel(...arguments);

    this.profile.set('active', model.get('profile'));
  }

  @action
  saveRecord() {
    let model = this.currentRouteModel();
    model.save().then(() => {
      this.flashMessages.success(`Saved Record: ${model.get('title')}`);
    });
  }

  @action
  cancelRecord() {
    let model = this.currentRouteModel();
    let message = `Cancelled changes to Record: ${model.get('title')}`;

    if (this.settings.data.autoSave) {
      let json = model.get('jsonRevert');

      if (json) {
        model.set('json', JSON.parse(json));

        this.doCancel();

        this.flashMessages.warning(message);
      }

      return;
    }

    model.reload().then(() => {
      this.doCancel();
      this.flashMessages.warning(message);
    });
  }

  @action
  getContext() {
    return this;
  }
}