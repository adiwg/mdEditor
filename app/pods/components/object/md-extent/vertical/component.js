/* global L */
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { set, get } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    let extent = get(this, 'extent.verticalExtent.0');
    let crsId = {
      "referenceSystemType": "referenceSystemType",
      "referenceSystemIdentifier": {
        "identifier": "identifier"
      }
    }

    once(this, function() {
      set(extent, 'crsId', crsId);
    });

  },

  verticalExtent: alias('extent.verticalExtent.0')
});
