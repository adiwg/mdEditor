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
  profile: service(),
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

  thesaurusList: computed('keyword.thesaurus.[]', 'profile.profiles', 'recordProfile', function () {
    let profileConfig = this.profile.profiles.find((p) => {
      return p.id === this.recordProfile;
    });
    let vocabularies = profileConfig.vocabularies;

    let defaultVocabularies = [
      {
        id: 'ISO 19115 Topic Category',
        name: 'ISO 19115 Topic Category'
      },
      {
        id: 'b2140059-b3ca-415c-b0a7-3e142783ffe8',
        name: 'GCMD Instruments'
      },
      {
        id: 'f3261de5-34c1-4980-af22-f9d7e7206d12',
        name: 'GCMD Platforms'
      },
      {
        id: '1eb0ea0a-312c-4d74-8d42-6f1ad758f999',
        name: 'GCMD Science Keywords'
      },
      {
        id: 'fa455d4a-5d87-56bc-b074-9a967beff904',
        name: 'LCC Deliverables'
      },
      {
        id: '425f4a7c-dca2-56d8-947e-6f6bd1033d70',
        name: 'LCC End User Types'
      },
      {
        id: '5da1d3b7-375b-58ae-a134-2ee0c94c395f',
        name: 'LCC Project Category'
      },
    ]

    let list = this.keyword
      .thesaurus
      .filter((k) => {
        if (vocabularies && vocabularies.length > 0) {
          return vocabularies.some((v) => {
            return v.id === k.citation.identifier[0].identifier;
          });
        } else {
          return defaultVocabularies.some((v) => {
            return v.id === k.citation.identifier[0].identifier;
          });
        }
      })
      .map((k) => {
        return EmberObject.create({
          id: k.citation.identifier[0].identifier,
          label: k.label || k.citation.title || 'Keywords',
          tooltipText: k.citation.description || 'No description available.',
        });
      })
      .sort((a, b) => {
        return a.label.localeCompare(b.label);
      });

    list.unshift(EmberObject.create({
      id: 'custom',
      label: 'Custom Thesaurus',
      tooltipText: "Select this option to use a custom thesaurus that you define yourself. This allows you to use your own set of keywords and categories that are specific to your project."
    }));
    return list;
  }),

  actions: {
    update(id, thesaurus) {
      let selected = this.keyword.findById(id);
      this.selectThesaurus(selected, thesaurus);
    }
  }
});
