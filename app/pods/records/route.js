import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('record');
  },

  renderTemplate() {
    this.render('records.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('records', {
      into: 'application'
    });
  },

  actions: {
    deleteItem: function(item) {
      if (window.confirm(
              "Do you really want to delete this record?")) {
        item.destroyRecord().then(function() {
          console.log('+-- deleted record ID:', item.id);
        }, function() {
          console.log('+--- delete record failed');
        });
      }
    },

    editItem: function(item) {
      this.transitionTo('record.show.edit', item);
    }
  }

});
