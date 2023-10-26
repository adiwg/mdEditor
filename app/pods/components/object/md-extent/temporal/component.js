/* global L */
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { set, get } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    let extent = get(this, 'extent.temporalExtent.0');
    let timeInstant = {
      "dateTime": "2016-10-24T11:10:00"
    }
    let timePeriod = {
      "startDateTime": "2016-10-24T11:10:00"
    }

    once(this, function() {
      set(extent, 'timeInstant', timeInstant);
      //set(extent, 'timePeriod', timePeriod);
    });

  },

  temporalExtent: alias('extent.temporalExtent.0'),
});
