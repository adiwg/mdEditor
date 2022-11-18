import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({

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
