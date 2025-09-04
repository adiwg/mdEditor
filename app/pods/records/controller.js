import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

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
}];

export default class RecordsController extends Controller {
  @service
  slider;

  columns = columns;

  @action
  getColumns() {
    return this.columns;
  }

  @action
  showSlider(rec, evt) {
    let slider = this.slider;

    evt.stopPropagation();
    this.set('errorTarget', rec);
    slider.set('fromName', 'md-slider-error');
    slider.toggleSlider(true);

    return false;
  }
}
