import BaseLayer from 'ember-leaflet/components/base-layer';
import { action } from '@ember/object';

export default class LayerGroupComponent extends BaseLayer {
  leafletOptions = [...this.leafletOptions, 'name', 'baselayer', 'default'];

  createLayer() {
    return this.L.layerGroup();
  }

  @action
  didInsertParent(element) {
    super.didInsertParent(element);
    this.registerWithParent();
  }

  registerWithParent() {
    let parent = this.args.parent;
    if (!parent) return;

    let name = this.args.name;
    let isBaseLayer = this.args.baselayer;
    let isDefault = this.args.default;

    if (isBaseLayer) {
      if (!parent._baseLayers) {
        parent._baseLayers = [];
      }
      parent._baseLayers.push({
        name: name,
        layer: this._layer,
        default: isDefault,
      });
    } else {
      if (!parent._layerGroups) {
        parent._layerGroups = [];
      }
      parent._layerGroups.push({
        name: name,
        layer: this._layer,
        default: isDefault,
      });
    }
  }

  @action
  willDestroyParent() {
    this.unregisterWithParent();
    super.willDestroyParent();
  }

  unregisterWithParent() {
    let parent = this.args.parent;
    if (!parent) return;

    let isBaseLayer = this.args.baselayer;

    if (isBaseLayer && parent._baseLayers) {
      parent._baseLayers = parent._baseLayers.filter(
        (layer) => layer.layer !== this._layer
      );
    } else if (parent._layerGroups) {
      parent._layerGroups = parent._layerGroups.filter(
        (layer) => layer.layer !== this._layer
      );
    }
  }
}
