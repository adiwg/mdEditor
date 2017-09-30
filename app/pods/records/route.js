import Ember from 'ember';

const {
  Route,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  slider: service(),
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
    },

    showSlider(rec) {
      let slider = this.get('slider');

      this.controller.set('errorTarget', rec);
      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);
    }
  },
  // action methods
  _deleteItem(item) {
    item.destroyRecord();
  }

});
