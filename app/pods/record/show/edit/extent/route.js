import classic from 'ember-classic-decorator';
import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { get, getWithDefault, set, action } from '@ember/object';
import $ from 'jquery';

@classic
export default class ExtentRoute extends Route {
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'extent', getWithDefault(info, 'extent', A()));

    get(info, 'extent').forEach((itm) => {
      set(
        itm,
        'geographicExtent',
        getWithDefault(itm, 'geographicExtent', A())
      );
      set(
        itm,
        'geographicExtent.0',
        getWithDefault(itm, 'geographicExtent.0', {})
      );
      set(
        itm,
        'geographicExtent.0.boundingBox',
        getWithDefault(itm, 'geographicExtent.0.boundingBox', {})
      );
      set(
        itm,
        'geographicExtent.0.identifier',
        getWithDefault(itm, 'geographicExtent.0.identifier', {})
      );
      set(itm, 'verticalExtent', getWithDefault(itm, 'verticalExtent', A()));
      set(itm, 'temporalExtent', getWithDefault(itm, 'temporalExtent', A()));
    });
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
          description: null,
          containsData: true,
          boundingBox: {},
          geographicElement: A(),
          identifier: {},
        },
      ],
      verticalExtent: A(),
      temporalExtent: A(),
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