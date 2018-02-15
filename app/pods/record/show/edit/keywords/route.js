import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  A,
  set,
  //Object: EmObject,
  NativeArray,
  getWithDefault,
  //assign,
  copy,
  inject,
  $
} = Ember;

export default Route.extend(ScrollTo, {
  keyword: inject.service(),
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'keyword', !info.hasOwnProperty('keyword') ? A() :
      NativeArray.apply(
        info.keyword));

    //check to see if custom list
    info.keyword.forEach((k) => {
      set(k, 'thesaurus', getWithDefault(k, 'thesaurus', {}));
      set(k, 'thesaurus.identifier', getWithDefault(k,
        'thesaurus.identifier', [{
          identifier: 'custom'
        }]));
      set(k, 'thesaurus.date', getWithDefault(k, 'thesaurus.date', [{}]));
      set(k, 'thesaurus.onlineResource', getWithDefault(k,
        'thesaurus.onlineResource', [{}]));

      // if(!has(k, 'thesaurus')) {
      //   set(k, 'thesaurus', {});
      // }
      // if(!has(k, 'thesaurus.identifier')) {
      //   set(k, 'thesaurus.identifier', [{
      //     identifier: 'custom'
      //   }]);
      // }
      // if(!has(k, 'thesaurus.date')) {
      //   set(k, 'thesaurus.date', [{}]);
      // }
      // if(!has(k, 'thesaurus.onlineResource')) {
      //   set(k, 'thesaurus.onlineResource', [{}]);
      // }

      //let obj = arr.objectAt(idx);
      //assign(obj, EmObject.create(k));
    });

    return model;
  },

  subbar: 'control/subbar-keywords',

  clearSubbar: function() {
    this.controllerFor('record.show.edit')
      .set('subbar', null);
  }.on('deactivate'),

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.get('subbar'));
    this.controller.set('subbar', this.get('subbar'));
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
      this.controller.set('scrollTo', 'thesaurus-' + (the.get('length')-1));
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
    addKeyword(model, obj) {
      let k = obj ? obj : {};

      model.pushObject(k);
    },
    deleteKeyword(model, obj) {
      if(typeof obj === 'number') {
        model.removeAt(obj);
      } else {
        model.removeObject(obj);
      }
    },
    hideThesaurus(el) {
      $(el).closest('.md-keywords-container').toggleClass('hide-thesaurus');
    },
    toList() {
      let me = this;

      me.transitionTo(me.get('routeName'))
        .then(function() {
          me.setupController();
        });
    }
  }
});
