import Component from '@ember/component';
import { getWithDefault, get, set } from '@ember/object';
import { once } from '@ember/runloop';
import uuidV4 from 'uuid/v4';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(function() {
      set(model, 'scope', (model.scope === undefined ? {} : model.scope));
      set(model, 'systemIdentifier', (model.systemIdentifier === undefined ? {uid: uuidV4()} : model.systemIdentifier))
    });
  },

  tagName: 'form',

  actions: {
    addStandaloneQualityReport() {
      set(this.model, 'standaloneQualityReport', { abstract: "" });
    },

    deleteStandaloneQualityReport() {
      set(this.model, 'standaloneQualityReport', undefined);
    }
  }

});
