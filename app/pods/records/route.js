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
    getColumns() {
      return this.get('columns');
    },

    showSlider(rec, evt) {
      let slider = this.get('slider');

      evt.stopPropagation();
      this.controller.set('errorTarget', rec);
      slider.set('fromName', 'md-slider-error');
      slider.toggleSlider(true);

      return false;
    }
  }
});
