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
        console.log('+--- updated contact ID:', model.id);
        this.transitionTo('contacts');
      }, function () {
        console.log('+--- update contact failed');
      });
    },

    cancelContact: function() {
      this.transitionTo('contacts');
    },

    addOnlineResource: function() {
      console.log('+- in addOnlineResource()');
    },

    editOnlineResource: function() {
      console.log('+- in editOnlineResource()');
    }
  }
});
