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
    let allVocabularies = this.keyword.thesaurus;

    let editModel = this.modelFor('record.show.edit');
    let json = editModel.get('json');
    let info = json.metadata.resourceInfo;
    let currentVocabularies = info.keyword || [];

    let showModel = this.modelFor('record.show');
    let profileId = showModel.profile;
    let profiles = this.profileService.profiles;
    let selectedProfile = profiles.find((profile) => `${profile.namespace}.${profile.identifier}` === profileId);

    let requiredVocabularies = selectedProfile.vocabularies || [];
    let missingVocabularies = requiredVocabularies.filter((requiredVocab) => {
      if (!requiredVocab.id) return false;
      return !(currentVocabularies.some((currentVocab) => currentVocab.thesaurus.identifier[0].identifier === requiredVocab.id));
    });

    if (missingVocabularies && missingVocabularies.length > 0) {
      missingVocabularies.forEach((missing) => {
        let missingVocab = allVocabularies.find((vocab) => vocab.citation.identifier[0].identifier === missing.id)
        currentVocabularies.pushObject({
          keyword: [],
          keywordType: missingVocab.keywordType || 'theme',
          thesaurus: copy(missingVocab.citation, true),
          fullPath: true
        })
      });
    }

    set(info, 'keyword', A(currentVocabularies));
    currentVocabularies.forEach((k, i) => {
      set(k, 'thesaurus', getWithDefault(k, 'thesaurus', {}));
      set(k, 'thesaurus.identifier', getWithDefault(k, 'thesaurus.identifier', [{ identifier: 'custom' }]));
      set(k, 'thesaurus.date', getWithDefault(k, 'thesaurus.date', [{}]));
      set(k, 'thesaurus.onlineResource', getWithDefault(k, 'thesaurus.onlineResource', [{}]));
    });

    return editModel;
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
