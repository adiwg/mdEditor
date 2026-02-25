import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const columns = [
  {
    propertyName: 'title',
    title: 'Title',
  },
  {
    propertyName: 'dictionaryId',
    title: 'ID',
    isHidden: true,
  },
  {
    propertyName: 'json.dataDictionary.subject',
    title: 'Subject',
  },
];

export default class DictionariesRoute extends Route {
  @service slider;
  @service store;

  columns = columns;

  model() {
    // findAll returns a PromiseArray; convert to plain array after resolution
    // so models-table can properly compute visibleContent
    return this.store.findAll('dictionary').then((dictionaries) => {
      return dictionaries.toArray();
    });
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
