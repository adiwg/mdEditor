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
    console.log('updateProfile', profile);
    console.log('profiles', this.profile.profiles);
    let allVocabularies = this.keyword.thesaurus;
    console.log('all vocabularies', allVocabularies);

    let selectedProfile = this.profile.profiles.find((p) => p.id === profile);
    console.log('selected profile', selectedProfile);

    let requiredVocabularies = selectedProfile.definition.vocabularies || [];
    console.log('requiredVocabularies', requiredVocabularies);

    let json = this.record.get('json');
    let info = json.metadata.resourceInfo;
    let currentVocabularies = info.keyword || [];
    console.log('initial vocabularies', currentVocabularies);

    let missingVocabularies = requiredVocabularies.filter((requiredVocab) => {
      if (!requiredVocab.id) return false;
      return !(currentVocabularies.some((currentVocab) => {
        return currentVocab.thesaurus.identifier[0].identifier === requiredVocab.id;
      }));
    });
    console.log('missing', missingVocabularies);

    let extraVocabularies = currentVocabularies.filter((currentVocab) => {
      return !(requiredVocabularies.some((requiredVocab) => {
        return requiredVocab.id === currentVocab.thesaurus.identifier[0].identifier;
      }));
    });
    console.log('extraVocabularies', extraVocabularies);

    let newVocabularies = currentVocabularies.filter((currentVocab) => {
      return requiredVocabularies.some((requiredVocab) => {
        return requiredVocab.id === currentVocab.thesaurus.identifier[0].identifier;
      });
    });

    extraVocabularies.forEach((vocabulary) => {
      if (vocabulary.keyword && vocabulary.keyword.length > 0) {
        newVocabularies.pushObject(vocabulary);
      }
    });

    if (missingVocabularies && missingVocabularies.length > 0) {
      missingVocabularies.forEach((missing) => {
        let missingVocab = allVocabularies.find((vocab) => {
          return vocab.citation.identifier[0].identifier === missing.id;
        })
        newVocabularies.pushObject({
          keyword: [],
          keywordType: missingVocab.keywordType || 'theme',
          thesaurus: copy(missingVocab.citation, true),
          fullPath: true
        })
      });
    }

    console.log('new vocab', newVocabularies);

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
