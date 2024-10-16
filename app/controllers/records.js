import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecordsController extends Controller {
  @service slider;

  columns = [
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

  @action
  getColumns() {
    return this.columns;
  }

  @action
  showSlider(rec, evt) {
    let slider = this.slider;

    evt.stopPropagation();
    this.errorTarget = rec;
    slider.fromName = 'md-slider-error';
    slider.toggleSlider(true);

    return false;
  }
}
