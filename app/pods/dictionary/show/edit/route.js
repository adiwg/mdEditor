import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: Ember.inject.service(),

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
          Ember.get(this, 'flashMessages')
            .success(`Saved Dictionary: ${model.get('title')}`);
        });
    },

    destroyDictionary: function () {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(`Deleted Dictionary: ${model.get('title')}`);
          this.replaceWith('dictionaries');
        });
    },

    cancelDictionary: function () {
      let model = this.currentRouteModel();
      model
        .reload()
        .then(() => {
          this.refresh();
          Ember.get(this, 'flashMessages')
            .warning(
              `Cancelled changes to Dictionary: ${model.get('title')}`);
        });
    },

    copyDictionary: function () {

      Ember.get(this, 'flashMessages')
        .success(`Copied Dictionary: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('dictionary.new.id', Ember.copy(this.currentRouteModel()));
    }
  }
});
