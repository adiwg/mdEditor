import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

const columns = [{
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
}];

@classic
export default class ContactsController extends Controller {
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
