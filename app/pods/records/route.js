import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('record');
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
      this._deleteItem(item);
    },

    editItem: function(item) {
      this.transitionTo('record.show.edit', item);
    }
  },

  // action methods
  _deleteItem(item) {
      item.destroyRecord();
  }
});
