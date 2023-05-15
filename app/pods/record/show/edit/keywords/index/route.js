import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { getWithDefault, set } from '@ember/object';
import { copy } from 'ember-copy';
import $ from 'jquery';
import ScrollTo from 'mdeditor/mixins/scroll-to';
// import { on } from '@ember/object/evented';

export default Route.extend(ScrollTo, {
  keyword: service(),
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'keyword', !info.hasOwnProperty('keyword') ? A() :
      A(
        info.keyword));

    //check to see if custom list
    info.keyword.forEach((k) => {
      set(k, 'thesaurus', (k.thesaurus === undefined ? {} : k.thesaurus));
      set(k, 'thesaurus.identifier', (get(k, 'thesaurus.identifier') === undefined ? [{
          identifier: 'custom'
        }] : get(k, 'thesaurus.identifier')));
      set(k, 'thesaurus.date', (get(k, 'thesaurus.date') === undefined ? [{}] : get(k, 'thesaurus.date')));
      set(k, 'thesaurus.onlineResource', (get(k, 'thesaurus.onlineResource') === undefined ? [{}] : get(k, 'thesaurus.onlineResource')));
    });

    return model;
  },

  actions: {
    getContext() {
      return this;
    },
    addThesaurus() {
      let the = this.currentRouteModel().get(
        'json.metadata.resourceInfo.keyword');

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
      if(selected) {
        set(thesaurus, 'thesaurus', copy(selected.citation,
          true));
        if(selected.keywordType) {
          set(thesaurus, 'keywordType', selected.keywordType);
        }
      } else {
        set(thesaurus, 'thesaurus.identifier.0.identifier', 'custom');
      }
    },
  }
});
