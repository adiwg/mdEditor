import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

const columns = [{
  propertyName: 'title',
  title: 'Title'
}, {
  propertyName: 'defaultType',
  title: 'Resource Type',
  filterWithSelect: true
}, {
  propertyName: 'recordId',
  title: 'ID'
}]

export default Route.extend({
  slider: service(),
  model() {
    //return this.store.peekAll('contact');
    return this.modelFor('application').findBy('modelName', 'record');
  },

  columns: columns,

  actions: {
    getColumns() {
      return this.columns;
    },

    showSlider(rec, evt) {
      let slider = this.slider;

      evt.stopPropagation();
      this.controller.set('errorTarget', rec);
      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);

      return false;
    }
  }
});
