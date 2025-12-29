import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const columns = [{
  propertyName: 'title',
  title: 'Title'
},{
  propertyName: 'dictionaryId',
  title: 'ID',
  isHidden: true
}, {
  propertyName: 'json.dataDictionary.subject',
  title: 'Subject'
}];

export default class DictionariesController extends Controller {
  @service slider;

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
