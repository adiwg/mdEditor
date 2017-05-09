import Ember from 'ember';
import HashPoll from 'mdeditor/mixins/hash-poll';

const {
  inject,
  Route,
  get,
  copy
} = Ember;

export default Route.extend(HashPoll, {
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: inject.service(),

  /**
   * The route activate hook, sets the profile to 'dictionary'.
   */
  activate() {
    this.get('profile').set('active', 'dictionary');
  },

  renderTemplate () {
    this.render('nav-secondary', {
      into: 'application',
      outlet: 'nav-secondary'
    });
    this.render('dictionary.show.edit', {
      into: 'dictionary'
    });
  },

  actions: {
    saveDictionary: function () {
      let model = this.currentRouteModel();
      model
        .save()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Saved Dictionary: ${model.get('title')}`);
        });
    },

    destroyDictionary: function () {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Deleted Dictionary: ${model.get('title')}`);
          this.replaceWith('dictionaries');
        });
    },

    cancelDictionary: function () {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Dictionary: ${model.get('title')}`;

      if (this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if (json) {
          model.set('json', JSON.parse(json));
          get(this, 'flashMessages').warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          get(this, 'flashMessages').warning(message);
        });
    },

    copyDictionary: function () {

      get(this, 'flashMessages')
        .success(`Copied Dictionary: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('dictionary.new.id', copy(this.currentRouteModel()));
    }
  }
});
