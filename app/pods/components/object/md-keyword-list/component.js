/**
 * @module mdeditor
 * @submodule components-object
 */

import { computed } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({
  readOnly: computed('model.thesaurus.identifier.0.identifier',
    function () {
      return this.get('model.thesaurus.identifier.0.identifier') !==
        'custom';
    }),

  actions: {
    addKeyword(model) {
      this.get('addKeyword')(model);
    },
    deleteKeyword(model, object) {
      this.get('deleteKeyword')(model, object);
    }
  }
});
