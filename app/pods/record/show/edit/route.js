import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Edit',
    linkable: false
  },

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
    this.get('profile')
      .set('active', model.get('profile'));
  },

  /**
   * [renderTemplate description]
   * @param  {[type]} controller [description]
   * @param  {[type]} model      [description]
   * @return {[type]}            [description]
   */
  renderTemplate(controller, model) {
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
  },

  actions: {
    /**
     * [delete description]
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    delete(model) {
        model.destroyRecord();
        this.transitionTo('records');
      },
    /**
     * [updateProfile description]
     * @param  {[type]} profile [description]
     * @return {[type]}         [description]
     */
    updateProfile(profile) {
      this.get('profile')
        .set('active', profile);
      this.modelFor('record.show.edit').save();
    }
  }
});
