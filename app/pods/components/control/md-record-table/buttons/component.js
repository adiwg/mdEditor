import { inject as service } from '@ember/service';
import Component from '@ember/component';

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
      this.router.transitionTo(`${item.constructor.modelName}.show.edit`, item);

      return false;
    },

    showSlider(rec, evt) {
      this.column.showSlider(rec, evt);
    }
  },

  _deleteItem(item) {
    item.destroyRecord().then(() => {
      item.unloadRecord();
    });
  }
});
