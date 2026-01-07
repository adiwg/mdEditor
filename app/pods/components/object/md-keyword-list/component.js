import Component from '@ember/component';
import { computed } from '@ember/object';

/**
 * @module mdeditor
 * @submodule components-object
 */

export default Component.extend({
  readOnly: computed('model.thesaurus.identifier.0.identifier',
    function () {
      return this.get('model.thesaurus.identifier.0.identifier') !==
        'custom';
    }),

  actions: {
    addKeyword(model) {
      this.addKeyword(model);
    },
    deleteKeyword(model, object) {
      this.deleteKeyword(model, object);
    },
    hideThesaurus(el) {
      const container = el.closest('.md-keywords-container');
      if (container) {
        container.classList.toggle('hide-thesaurus');
      }
    },
  }
});
