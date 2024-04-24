import Component from '@ember/component';
import { get, set } from '@ember/object';
import { once } from '@ember/runloop';
import uuidV4 from 'uuid/v4';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(function () {
      set(
        model,
        'scope',
        get(model, 'scope') !== undefined ? get(model, 'scope') : {},
      );
      set(
        model,
        'systemIdentifier',
        get(model, 'systemIdentifier') !== undefined
          ? get(model, 'systemIdentifier')
          : { uid: uuidV4() },
      );
      set(
        model,
        'report',
        get(model, 'report') !== undefined ? get(model, 'report') : [],
      );
    });
  },

  tagName: 'form',

  actions: {
    addStandaloneQualityReport() {
      set(this.model, 'standaloneQualityReport', { abstract: '' });
    },

    deleteStandaloneQualityReport() {
      set(this.model, 'standaloneQualityReport', undefined);
    },
  },
});
