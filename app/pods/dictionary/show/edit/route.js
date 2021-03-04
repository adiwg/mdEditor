import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';
import DoCancel from 'mdeditor/mixins/cancel';

@classic
export default class EditRoute extends Route.extend(HashPoll, DoCancel) {
  /**
   * The profile service
   *
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

  /**
   * Update the dictionary profile
   *
   * @param  {String} profile The new profile.
   */
  @action
  saveDictionary() {
    let model = this.currentRouteModel();

    model.save().then(() => {
      this.flashMessages.success(`Saved Dictionary: ${model.get('title')}`);
    });
  }

  @action
  cancelDictionary() {
    let model = this.currentRouteModel();
    let message = `Cancelled changes to Dictionary: ${model.get('title')}`;

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
}
