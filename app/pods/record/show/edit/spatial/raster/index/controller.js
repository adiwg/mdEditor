import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class RasterIndexController extends Controller {
  @action
  editAttribute(id, routeParams, scrollToId) {
    this.setScrollTo(scrollToId);
    this.transitionToRoute(
      'record.show.edit.spatial.raster.attribute',
      this.rasterId,
      routeParams,
      id
    );
  }

  @action
  deleteAttrGroup(id) {
    this.model['attributeGroup'].removeAt(id);
  }

  @action
  addAttrGroup() {
    this.model['attributeGroup'].pushObject([]);
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
