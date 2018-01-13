import Ember from 'ember';
import HashPoll from 'mdeditor/mixins/hash-poll';

const {
  inject,
  Route
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
      into: 'dictionary.show'
    });
  }
});
