import { A } from '@ember/array';
import { getWithDefault, set } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { copy } from 'ember-copy';
import $ from 'jquery';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  keyword: service(),
  profileService: service('profile'),
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;
    let recordModel = this.modelFor('record.show');
    let profileId = recordModel.profile;
    let profiles = this.profileService.profiles;
    let allVocabularies = this.keyword.thesaurus; // list of all vocabularies known to mdEditor
    console.log('all vocabularies', allVocabularies);

    let selectedProfile = profiles.find((profile) => {
      return `${profile.namespace}.${profile.identifier}` === profileId;
    });
    console.log('selectedProfile', selectedProfile);
    
    let requiredVocabularies = selectedProfile.vocabularies || [];
    console.log('requiredVocabularies', requiredVocabularies);

    // info.keyword is the list of vocabularies (aka: thesauri) that have been added to the record
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

    if (missingVocabularies && missingVocabularies.length > 0) {
      missingVocabularies.forEach((missing) => {
        let missingVocab = allVocabularies.find((vocab) => {
          return vocab.citation.identifier[0].identifier === missing.id;
        })
        currentVocabularies.pushObject({
          keyword: [],
          keywordType: missingVocab.keywordType || 'theme',
          thesaurus: copy(missingVocab.citation, true),
          fullPath: true
        })
      });
    }

    set(info, 'keyword', A(currentVocabularies));

    console.log('record:', info.citation.title)
    currentVocabularies.forEach((k, i) => {
      console.log(`info.keyword[${i}]`, k);
      set(k, 'thesaurus', getWithDefault(k, 'thesaurus', {}));
      set(k, 'thesaurus.identifier', getWithDefault(k,
        'thesaurus.identifier', [{
          identifier: 'custom'
        }]));
      set(k, 'thesaurus.date', getWithDefault(k, 'thesaurus.date', [{}]));
      set(k, 'thesaurus.onlineResource', getWithDefault(k,
        'thesaurus.onlineResource', [{}]));
    });

    return model;
  },

  actions: {
    getContext() {
      return this;
    },
    addThesaurus() {
      console.log('addThesaurus');
      let the = this.currentRouteModel().get( 'json.metadata.resourceInfo.keyword');
      console.log('the', the);

      $("html, body").animate({ scrollTop: $(document).height() }, "slow");

      the.pushObject({
        keyword: [],
        keywordType: 'theme',
        thesaurus: {
          identifier: [{
            identifier: null
          }]
        },
        fullPath: true
      });

      this.controller.set('refresh', the.get('length'));
      this.controller.set('scrollTo', 'thesaurus-' + (the.get('length') - 1));
    },
    deleteThesaurus(id) {
      let the = this.currentRouteModel().get(
        'json.metadata.resourceInfo.keyword');
      the.removeAt(id);
      this.controller.set('refresh', the.get('length'));
    },
    editThesaurus(id) {
      this.transitionTo('record.show.edit.keywords.thesaurus', id);
    },
    selectThesaurus(selected, thesaurus) {
      console.log('selectThesaurus', selected, thesaurus);
      if(selected) {
        set(thesaurus, 'thesaurus', copy(selected.citation, true));
        if(selected.keywordType) {
          set(thesaurus, 'keywordType', selected.keywordType);
        }
      } else {
        set(thesaurus, 'thesaurus.identifier.0.identifier', 'custom');
      }
    },
  }
});
