import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

/**
 * @module mdeditor
 * @submodule components-object
 */

export default Component.extend({
  readOnly: computed('model.thesaurus.identifier.0.identifier', function () {
    return this.get('model.thesaurus.identifier.0.identifier') !== 'custom';
  }),

  actions: {
    addKeyword(model) {
      this.addKeyword(model);
    },
    deleteKeyword(model, object) {
      this.deleteKeyword(model, object);
    },
    hideThesaurus(el) {
      $(el).closest('.md-keywords-container').toggleClass('hide-thesaurus');
    },
  },
});
