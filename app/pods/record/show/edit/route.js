import Ember from 'ember';
import HashPoll from 'mdeditor/mixins/hash-poll';

const {
  inject,
  Route,
  get
} = Ember;

export default Route.extend(HashPoll, {
  breadCrumb: {
    title: 'Edit',
    linkable: false
  },

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: inject.service(),

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this._super(...arguments);

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
      let model = this.currentRouteModel();
      model
        .save()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Saved Record: ${model.get('title')}`);
        });
    },

    // destroyRecord: function () {
    //   let model = this.currentRouteModel();
    //   model
    //     .destroyRecord()
    //     .then(() => {
    //       get(this, 'flashMessages')
    //         .success(`Deleted Record: ${model.get('title')}`);
    //       this.replaceWith('records');
    //     });
    // },

    cancelRecord: function () {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Record: ${model.get('title')}`;

      if(this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if(json) {
          model.set('json', JSON.parse(json));

          if(this.controller.onCancel) {
            this.controller.onCancel.call(this);
          }

          get(this, 'flashMessages')
            .warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          if(this.controller.onCancel) {
            this.controller.onCancel.call(this);
          }
          get(this, 'flashMessages')
            .warning(message);
        });
    },

    // copyRecord: function () {
    //
    //   get(this, 'flashMessages')
    //     .success(
    //       `Copied Record: ${this.currentRouteModel().get('title')}`);
    //   this.transitionTo('record.new.id', copy(this.currentRouteModel()));
    // },
    getContext() {
      return this;
    }
  }
});
