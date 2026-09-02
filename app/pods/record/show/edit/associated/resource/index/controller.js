import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

const sliderColumns = [
  {
    propertyName: 'recordId',
    title: 'ID',
  },
  {
    propertyName: 'title',
    title: 'Title',
  },
  {
    propertyName: 'defaultType',
    title: 'Type',
  },
];

export default class AssociatedResourceIndexController extends Controller {
  @service router;
  @service store;
  @service slider;

  sliderColumns = sliderColumns;

  @action
  insertResource(selected) {
    let rec = selected.get('firstObject');

    if (rec) {
      set(this.model, 'mdRecordId', rec.recordId);
    }

    this.slider.toggleSlider(false);
    selected.clear();
  }

  @action
  selectResource() {
    this.slider.toggleSlider(true);
  }

  @action
  sliderData() {
    return this.store.peekAll('record').filter((item) => item.recordId);
  }

  @action
  getSliderColumns() {
    return this.sliderColumns;
  }

  @action
  editLinked(rec) {
    this.router.transitionTo('record.show.edit', rec.get('id'));
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
