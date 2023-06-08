import { A } from '@ember/array';
import Component from '@ember/component';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import calculatePosition from 'ember-basic-dropdown/utils/calculate-position';
import { copy } from 'ember-copy';

export default Component.extend({
  /**
  * Input that displays available record profiles.
  *
  * @module mdeditor
  * @submodule components-input
  * @class input/md-select-profile
  * @constructor
  */
  profile: service('custom-profile'),

  keyword: service(),

  /**
   * Update the record profile
   *
   * @method   action.updateProfile
   * @param  {String} profile The new profile.
   */
  updateProfile(profile){
    let allVocabularies = this.keyword.thesaurus;

    let selectedProfile = this.profile.profiles.find((p) => p.id === profile);
    let requiredVocabularies = selectedProfile.definition.vocabularies || [];

    let json = this.record.get('json');
    let info = json.metadata.resourceInfo;
    let currentVocabularies = info.keyword || [];

    let newVocabularies = currentVocabularies.filter((currentVocab) => {
      return requiredVocabularies.some((requiredVocab) => requiredVocab.id === currentVocab.thesaurus.identifier[0].identifier);
    });

    currentVocabularies.filter((currentVocab) => {
      return !(requiredVocabularies.some((requiredVocab) => requiredVocab.id === currentVocab.thesaurus.identifier[0].identifier));
    }).forEach((vocabulary) => {
      if (vocabulary.keyword && vocabulary.keyword.length > 0) newVocabularies.pushObject(vocabulary);
    });

    requiredVocabularies.filter((requiredVocab) => {
      return requiredVocab.id && !currentVocabularies.some((currentVocab) =>
        currentVocab.thesaurus.identifier[0].identifier === requiredVocab.id
      );
    }).forEach((missing) => {
      let missingVocab = allVocabularies.find((vocab) => vocab.citation.identifier[0].identifier === missing.id);
      newVocabularies.pushObject({
        keyword: [],
        keywordType: missingVocab.keywordType || 'theme',
        thesaurus: copy(missingVocab.citation, true),
        fullPath: true
      });
    });

    set(info, 'keyword', A(newVocabularies));
    this.profile.set('active', profile);
    this.record.save();
  },

/**
* Calculate the width of the input.
*
* @method calculatePosition
* @private
* @return {String}
*/
  calculatePosition() {
    let originalValue = calculatePosition(...arguments);
    originalValue.style['min-width'] =   originalValue.style.width + 'px';
    originalValue.style.width = 'auto';
    originalValue.style['max-width'] = '250px';
    return originalValue;
  },

  actions: {
    /**
     * Update the record profile
     *
     * @method   action.updateProfile
     * @param  {String} profile The new profile.
     */
    updateProfile(profile) {
      this.updateProfile(profile);
    }
  }
});
