import Ember from 'ember';
import Component from '@ember/component';

const {
  inject: {
    service
  }
} = Ember;

export default Component.extend({
  router: service(),
  classNames: ['md-dashboard-buttons'],

  actions: {
    deleteItem(item, index, isSelected, clickOnRow) {
      if(isSelected) {
        clickOnRow(index, item);
      }

      this._deleteItem(item);
    },

    editItem(item, evt) {
      evt.stopPropagation();
      this.get('router').transitionTo(`${item.constructor.modelName}.show.edit`, item);

      return false;
    }
  },

  _deleteItem(item) {
    item.destroyRecord().then(() => {
      item.unloadRecord();
    });
  }
});
