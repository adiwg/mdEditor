import Ember from 'ember';
import has from 'npm:lodash/fp';

export default Ember.Route.extend({
  keyword: Ember.inject.service(),
  model() {
    let json = this.modelFor('record.show.edit')
      .get('json');
    let info = json.metadata.resourceInfo;

    if(!info.hasOwnProperty('keyword')) {
      info.keyword = Ember.A();
    }

    //check to see if custom list
    info.keyword.forEach((k) => {
      if(!has(k, 'thesaurus.identifier')) {
        k.thesaurus.identifier = [{
          identifier: 'custom'
        }];
      }
      if(!has(k, 'thesaurus.date')) {
        k.thesaurus.date = [{}];
      }
      if(!has(k, 'thesaurus.onlineResource')) {
        k.thesaurus.onlineResource = [{}];
      }
    });

    return Ember.Object.create({
      keywords: info.keyword
    });
  },

  subbar: 'control/subbar-keywords',

  clearSubbar: function () {
    this.controllerFor('record.show.edit')
      .set('subbar', null);
  }.on('deactivate'),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.get('subbar'));
    this.controller.set('subbar', this.get('subbar'));
  },

  actions: {
    addThesaurus() {
      let the = this.currentModel.get('keywords');

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
    },
    deleteThesaurus(id) {
      let the = this.currentModel.get('keywords');
      the.removeAt(id);
    },
    editThesaurus(id) {
      this.transitionTo('record.show.edit.keywords.thesaurus', id);
    },
    selectThesaurus(selected, thesaurus) {
      if(selected) {
        Ember.set(thesaurus, 'thesaurus', Ember.copy(selected.citation,
          true));
        if(selected.keywordType) {
          Ember.set(thesaurus, 'keywordType', selected.keywordType);
        }
      } else {
        Ember.set(thesaurus, 'thesaurus.identifier.0.identifier', 'custom');
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
    toList() {
      let me = this;
      
      me.transitionTo(me.get('routeName'))
        .then(function () {
          me.setupController();
        });
    }
  }
});

// import Ember from 'ember';
//
// export default Ember.Route.extend({
//   keyword: Ember.inject.service(),
//   model() {
//     let kw = this.get('keyword').scienceKeywords[0].children;
//     //kw[0].isVisible = true;
//     return kw;
//
//     return Ember.A([Ember.Object.create({
//       id: 0,
//       name: 'Root',
//       isExpanded: true,
//       isSelected: false,
//       isVisible: true,
//       children: [{
//         id: 1,
//         name: 'First Child',
//         isExpanded: true,
//         isSelected: false,
//         isVisible: true,
//         children: []
//       }, {
//         id: 2,
//         name: 'Second Child',
//         isExpanded: false,
//         isSelected: false,
//         isVisible: true,
//         children: [{
//           id: 3,
//           name: 'First Grand Child',
//           isExpanded: true,
//           isSelected: true,
//           isVisible: true,
//           children: []
//         }]
//       }]
//     })]);
//   }
// });
