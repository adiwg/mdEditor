import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let json = this.modelFor('record.show.edit')
      .get('json');
    let info = json.metadata.resourceInfo;

    if(!info.hasOwnProperty('keyword')) {
      info.keyword = Ember.A();
    }

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
        keywordType: '',
        thesaurus: {}
      });
    },
    deleteThesaurus(id) {
      let the = this.currentModel.get('keywords');

      the.removeAt(id);
    },
    editThesaurus(id) {
      this.transitionTo('record.show.edit.keywords.thesuarus', id);
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
