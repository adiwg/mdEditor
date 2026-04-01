import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RasterIndexController extends Controller {
  @service router;

  @action
  editAttribute(id, routeParams, scrollToId) {
    this.setScrollTo(scrollToId);
    this.router.transitionTo(
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
