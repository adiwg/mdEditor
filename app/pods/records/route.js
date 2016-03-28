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
      let message =
        "Do you really want to delete this record?";
      this._deleteItem(item, message);
    },

    editItem: function(item) {
      this.transitionTo('record.show.edit', item);
    }
  },

  // action methods
  _deleteItem(item, message) {
    if (window.confirm(message)) {
      item.destroyRecord().then(function() {
        console.log('+-- deleted record ID:', item.id);
      }, function() {
        console.log('+-- delete record failed');
      });
    }
  }

});
