import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsController extends Controller {
  @service slider;

  columns = [
    {
      propertyName: 'title',
      title: 'Title2',
    },
    {
      propertyName: 'defaultOrganizationName',
      title: 'Organization',
    },
    {
      propertyName: 'json.electronicMailAddress.firstObject',
      title: 'E-mail',
    },
    {
      propertyName: 'contactId',
      title: 'ID',
      isHidden: true,
    },
    {
      propertyName: 'type',
      title: 'Contact Type',
      filterWithSelect: true,
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
