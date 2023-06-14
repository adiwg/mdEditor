/**
 * @module mdeditor
 * @submodule components-input
 */

import EmberObject, { computed } from '@ember/object';

import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  /**
   * A select list control for displaying and selecting thesaurus entries from
   * the keyword service.
   *
   * @class md-select-thesaurus
   * @constructor
   */

  keyword: service(),

  /**
   * This method is called after the thesaurus selection is updated. It should be
   * overridden.
   *
   * @method selectThesaurus
   * @param  {Object} selected  The selected thesaurus from the keyword service
   * @param  {Object} thesaurus The thesaurus for the keyword record
   */
  selectThesaurus() {},

  thesaurusList: computed('keyword.thesaurus.[]', function () {
    let list = this.keyword.thesaurus.map((k) => {
      return EmberObject.create({
        id: k.citation.identifier[0].identifier,
        label: k.label || k.citation.title || 'Keywords',
      });
    });

    list.unshift(
      EmberObject.create({
        id: 'custom',
        label: 'Custom Thesaurus',
      })
    );
    return list;
  }),
  actions: {
    update(id, thesaurus) {
      let selected = this.keyword.findById(id);

      this.selectThesaurus(selected, thesaurus);
    },
  },
});
