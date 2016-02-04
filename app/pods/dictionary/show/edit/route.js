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
  }
});
