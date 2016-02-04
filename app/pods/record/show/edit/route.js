import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: Ember.inject.service(),

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this.get('profile').set('active', model.get('profile'));
  },

  renderTemplate (controller, model) {
    this.render('record.show.edit.nav', {
      into: 'records.nav'
    });
    this.render('nav-secondary', {
      into: 'application',
      outlet: 'nav-secondary'
    });
    this.render('record.show.edit', {
      into: 'record',
      model: model
    });
  }
});
