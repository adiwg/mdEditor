import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExtentIndexController extends Controller {
  @service router;

  setExtents(extents) {
    let model = this.model;

    if (!model) {
      return;
    }

    if (typeof model.set === 'function') {
      model.set('json.metadata.resourceInfo.extent', extents);
      return;
    }

    let json = model.json || {};
    let metadata = json.metadata || {};
    let resourceInfo = metadata.resourceInfo || {};

    resourceInfo.extent = extents;
    metadata.resourceInfo = resourceInfo;
    json.metadata = metadata;

    set(model, 'json', json);
  }

  getExtents() {
    let model = this.model;

    if (!model) {
      return null;
    }

    let json = model.json || {};
    let metadata = json.metadata || {};
    let resourceInfo = metadata.resourceInfo || {};

    if (!Array.isArray(resourceInfo.extent)) {
      resourceInfo.extent = [];
    }

    if (!metadata.resourceInfo) {
      metadata.resourceInfo = resourceInfo;
    }

    if (!json.metadata) {
      json.metadata = metadata;
    }

    if (!model.json) {
      model.json = json;
    }

    return resourceInfo.extent;
  }

  @action
  addExtent() {
    let extents = this.getExtents();

    if (!extents) {
      return;
    }

    let newExtent = {
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
    };

    this.setExtents([...extents, newExtent]);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  @action
  deleteExtent(id) {
    let extents = this.getExtents();

    if (!extents) {
      return;
    }

    let index = Number(id);

    if (Number.isNaN(index) || index < 0 || index >= extents.length) {
      return;
    }

    this.setExtents(extents.filter((_, idx) => idx !== index));
  }

  @action
  editFeatures(id) {
    this.router.transitionTo({
      queryParams: { scrollTo: 'extent-' + id },
    });
    this.router.transitionTo('record.show.edit.extent.spatial', id);
  }

  @action
  toList() {
    this.router.transitionTo('record.show.edit.extent.index');
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
