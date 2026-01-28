import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExtentRoute extends Route {
  @service router;

  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let resourceInfo = json.metadata.resourceInfo;

    set(resourceInfo, 'extent', get(resourceInfo, 'extent') ?? []);

    return model;
  }

  @action
  addExtent() {
    let extents = this.currentRouteModel().get(
      'json.metadata.resourceInfo.extent'
    );

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
    let extents = this.currentRouteModel().get(
      'json.metadata.resourceInfo.extent'
    );
    let extent = extents[id];

    extents.removeObject(extent);
  }

  @action
  editFeatures(id) {
    this.router.transitionTo({ queryParams: { scrollTo: 'extent-' + id } });
    this.router.transitionTo('record.show.edit.extent.spatial', id);
  }

  @action
  toList() {
    this.router.transitionTo(this.routeName);
  }
}
