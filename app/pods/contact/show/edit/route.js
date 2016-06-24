import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  },

  actions: {
    saveContact: function() {
      let model = this.modelFor('contact.show.edit');
      model.save().then(() => {
        this.transitionTo('contacts');
      });
    },

    cancelContact: function() {
      this.transitionTo('contacts');
    }
  }
});
