import BaseLayer from 'ember-leaflet/components/base-layer';
import { action } from '@ember/object';

export default class LayerControlComponent extends BaseLayer {
  createLayer() {
    return this.L.control.layers();
  }

  @action
  didInsertParent(element) {
    super.didInsertParent(element);
    this.setupLayerControl();
  }

  setupLayerControl() {
    let parent = this.args.parent;
    if (!parent) return;

    // Add base layers
    if (parent._baseLayers) {
      parent._baseLayers.forEach((baseLayer) => {
        if (baseLayer.default) {
          let parentLayer = parent._layer;
          baseLayer.layer.addTo(parentLayer);
        }
        this._layer.addBaseLayer(baseLayer.layer, baseLayer.name);
      });
    }

    // Add overlay layers
    if (parent._layerGroups) {
      parent._layerGroups.forEach((layerGroup) => {
        let parentLayer = parent._layer;
        if (layerGroup.default) {
          layerGroup.layer.addTo(parentLayer);
        } else {
          layerGroup.layer.remove();
        }
        this._layer.addOverlay(layerGroup.layer, layerGroup.name);
      });
    }

    // Set up event handlers if provided
    if (this.args.handler) {
      let map = parent._layer;
      map.on('overlayadd', this.args.handler);
      map.on('overlayremove', this.args.handler);
      map.on('baselayerchange', this.args.handler);
    }
  }

  // By default all layers try to register in a container layer.
  // Layer control is a map control, not a layer, so it doesn't need to register
  registerWithParent() {}
  unregisterWithParent() {}

  addToContainer() {
    this.args.parent._layer.addControl(this._layer);
  }

  removeFromContainer() {
    this.args.parent._layer.removeControl(this._layer);
  }
}
