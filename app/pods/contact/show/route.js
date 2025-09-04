import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class ShowRoute extends Route.extend(ScrollTo) {
  model(params) {
    return this.store.peekRecord('contact', params.contact_id);
  }
}
