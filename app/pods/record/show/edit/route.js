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
     * Update the record profile
     *
     * @name   updateProfile
     * @param  {String} profile The new profile.
     */
    updateProfile(profile) {
      this.get('profile')
        .set('active', profile);
      this.modelFor('record.show.edit')
        .save();
    },

    saveRecord: function () {
      let model = this.currentModel;
      model
        .save()
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(`Saved Record: ${model.get('title')}`);
        });
    },

    destroyRecord: function () {
      let model = this.currentModel;
      model
        .destroyRecord()
        .then(() => {
          Ember.get(this, 'flashMessages')
            .success(`Deleted Record: ${model.get('title')}`);
          this.replaceWith('records');
        });
    },

    cancelRecord: function () {
      let model = this.currentModel;
      model
        .reload()
        .then(() => {
          this.refresh();
          Ember.get(this, 'flashMessages')
            .warning(
              `Cancelled changes to Record: ${model.get('title')}`);
        });
    },

    copyRecord: function () {

      Ember.get(this, 'flashMessages')
        .success(`Copied Record: ${this.currentModel.get('title')}`);
      this.transitionTo('record.new.id', Ember.copy(this.currentModel));
    },
    getContext() {
      return this;
    }
  }
});
