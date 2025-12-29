import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { getWithDefault, set, action } from '@ember/object';
/* global $ */

@classic
export default class ExtentRoute extends Route {
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let resourceInfo = json.metadata.resourceInfo;

    set(resourceInfo, 'extent', getWithDefault(resourceInfo, 'extent', []));

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

    $('html, body').animate(
      {
        scrollTop: $(document).height(),
      },
      'slow'
    );
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
    this.transitionTo({ queryParams: { scrollTo: 'extent-' + id } });
    this.transitionTo('record.show.edit.extent.spatial', id);
  }

  @action
  toList() {
    this.transitionTo(this.routeName);
  }
}
