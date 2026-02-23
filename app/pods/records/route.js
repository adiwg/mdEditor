import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const columns = [
  {
    propertyName: 'title',
    title: 'Title',
  },
  {
    propertyName: 'defaultType',
    title: 'Resource Type',
    filterWithSelect: true,
  },
  {
    propertyName: 'recordId',
    title: 'ID',
  },
];

export default class RecordsRoute extends Route {
  @service slider;
  @service store;

  columns = columns;

  model() {
    return this.store.peekAll('record');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);
  }

  @action
  getColumns() {
    return this.columns;
  }

  @action
  showSlider(rec, evt) {
    let slider = this.slider;

    evt.stopPropagation();
    this.controller.set('errorTarget', rec);
    slider.set('fromName', 'md-slider-error');
    slider.toggleSlider(true);

    return false;
  }
}
