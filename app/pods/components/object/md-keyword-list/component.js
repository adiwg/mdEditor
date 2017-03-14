/**
 * @module mdeditor
 * @submodule components-object
 */

import Ember from 'ember';

export default Ember.Component.extend({
  readOnly: Ember.computed('model.thesaurus.identifier.0.identifier',
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
