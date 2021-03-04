import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

const columns = [
  {
    propertyName: 'title',
    title: 'Title',
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

@classic
export default class ContactsRoute extends Route {
  @service
  slider;

  model() {
    //return this.store.peekAll('contact');
    return this.modelFor('application').findBy('modelName', 'contact');
  }

  columns = columns;

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
