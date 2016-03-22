import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('dictionary');
  },

  actions: {
    deleteItem: function(item) {
      if (window.confirm(
              "Do you really want to delete this dictionary?\n\n" +
              "Be sure this dictionary is not referenced by an metadata records " +
              "or it's deletion may cause those records to not validate.")) {
        item.destroyRecord().then(function() {
          console.log('+-- deleted dictionary ID:', item.id);
        }, function() {
          console.log('+--- delete dictionary failed');
        });
      }
    },

    editItem: function(item) {
      this.transitionTo('dictionary.show.edit', item);
    }
  }

});
