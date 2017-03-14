/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * A select list control for displaying and selecting thesaurus entries from
   * the keyword service.
   *
   * @class md-select-thesaurus
   * @constructor
   */

  keyword: Ember.inject.service(),

  /**
   * This method is called after the thesaurus selection is updated. It should be
   * overridden.
   *
   * @method selectThesaurus
   * @param  {Object} selected  The selected thesaurus from the keyword service
   * @param  {Object} thesaurus The thesaurus for the keyword record
   */
  selectThesaurus() {},

  thesaurusList: Ember.computed('keyword.thesaurus.[]', function () {
    let list = this.get('keyword')
      .thesaurus
      .map((k) => {
        return Ember.Object.create({
          id: k.citation.identifier[0].identifier,
          label: k.label || k.citation.title || 'Keywords'
        });
      });

    list.unshift(Ember.Object.create({
      id: 'custom',
      label: 'Custom Entry'
    }));
    return list;
  }),
  actions: {
    update(id, thesaurus) {
      let selected = this.get('keyword')
        .findById(id);

      this.get('selectThesaurus')(selected, thesaurus);
    }
  }
});
