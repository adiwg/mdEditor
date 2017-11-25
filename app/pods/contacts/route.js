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
    return this.store.peekAll('contact');
  },

  columns: [{
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'defaultOrganizationName',
    title: 'Organization'
  }, {
    propertyName: 'json.electronicMailAddress.firstObject',
    title: 'E-mail'
  }, {
    propertyName: 'contactId',
    title: 'ID',
    isHidden: true
  }, {
    propertyName: 'type',
    title: 'Contact Type',
    filterWithSelect: true
  }],

  actions: {
    getColumns(){
      return this.get('columns');
    },

    deleteItem(item, index, isSelected, clickOnRow) {
      if (isSelected) {
        clickOnRow(index,item);
      }

      this._deleteItem(item);
    },

    editItem(item, evt) {
      evt.stopPropagation();
      this.transitionTo('contact.show.edit', item);

      return false;
    },

    showSlider(rec, evt) {
      let slider = this.get('slider');

      evt.stopPropagation();
      this.controller.set('errorTarget', rec);
      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);

      return false;
    }
  },

  // action methods
  _deleteItem(item) {
    /*let message =
        `Do you really want to delete this contact?\n\n
        Be sure this contact is not referenced by a metadata record or dictionary
        or it's deletion may cause those records to not validate.`;*/
      item.destroyRecord();
  }

});
