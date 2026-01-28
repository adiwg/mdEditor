import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const sliderColumns = [{
  propertyName: 'recordId',
  title: 'ID'
}, {
  propertyName: 'title',
  title: 'Title'
}, {
  propertyName: 'defaultType',
  title: 'Type'
}];

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service store;
  @service slider;
  @service router;

  sliderColumns = sliderColumns;
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('resourceId', get(this.controllerFor(
      'record.show.edit.associated.resource'), 'resourceId'));
  }

  @action
  insertResource(selected) {
      let slider = this.slider;
      let rec = selected.get('firstObject');

      if(rec) {
        let resource = this.currentRouteModel();

        set(resource, 'mdRecordId', get(rec, 'recordId'));
      }

    //this.controller.set('slider', false);
    slider.toggleSlider(false);
    selected.clear();
  }

  @action
  selectResource() {
      let slider = this.slider;

    //this.controller.set('slider', true);
    slider.toggleSlider(true);
  }

  @action
  sliderData() {
    return this.store.peekAll('record').filterBy('recordId');
  }

  @action
  sliderColumns() {
    return this.sliderColumns;
  }

  @action
  editLinked(rec) {
    this.router.transitionTo('record.show.edit', rec.get('id'));
  }
}