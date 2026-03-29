import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExtentIndexController extends Controller {
  @service router;

  @action
  addExtent() {
    let extents = this.model.get('json.metadata.resourceInfo.extent');

    extents.pushObject({
      description: null,
      geographicExtent: [
        {
          containsData: true,
          identifier: {},
          boundingBox: {},
          geographicElement: [],
          description: null,
        },
      ],
      verticalExtent: [],
      temporalExtent: [],
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  @action
  deleteExtent(id) {
    let extents = this.model.get('json.metadata.resourceInfo.extent');
    let extent = extents[id];

    extents.removeObject(extent);
  }

  @action
  editFeatures(id) {
    this.router.transitionToRoute({
      queryParams: { scrollTo: 'extent-' + id },
    });
    this.router.transitionToRoute('record.show.edit.extent.spatial', id);
  }

  @action
  toList() {
    this.router.transitionToRoute('record.show.edit.extent.index');
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
