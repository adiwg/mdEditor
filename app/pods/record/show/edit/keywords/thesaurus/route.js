import Ember from 'ember';

export default Ember.Route.extend({
  keyword: Ember.inject.service(),
  model(params) {
    let model = this.modelFor('record.show.edit.keywords');
    let kw = model.get('keywords')[params.thesaurus_id];
    //let keywords = kw.keyword;

    return Ember.Object.create({
      id: params.thesaurus_id,
      keywords: kw,
      thesaurus: this.get('keyword')
        .findById(kw.thesaurus.identifier[0].identifier)
    });
  },

  renderTemplate() {
    this.render('record.show.edit.keywords.thesaurus', {
      into: 'record.show.edit'
    });
  },

  subbar: 'control/subbar-thesaurus',

  // clearSubbar: function() {
  //   this.controllerFor('record.show.edit')
  //     .set('subbar', null);
  // }.on('deactivate'),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.get('subbar'));
  },

  actions: {
    willTransition: function (transition) {
      let parent = this.routeName.substring(0, this.routeName.lastIndexOf(
        '.'));

      let subbar = transition.targetName === parent + '.index' ? this.controllerFor(
          parent)
        .get('subbar') : null;

      this.controllerFor('record.show.edit')
        .set('subbar', subbar);
    },
    selectKeyword(model, path) {
      let keywords = this.currentModel.get('keywords');
      let kw = keywords.keyword;

      if(model.isSelected) {
        let pathStr = '';

        if(Ember.isArray(path)) {
          pathStr = path.reduce(function (prev, item) {
            prev = prev ? `${prev} > ${item.label}` : item.label;

            return prev;
          }, '');
        }

        kw.pushObject({
          identifier: model.uuid,
          keyword: keywords.fullPath && pathStr ?
            pathStr : model.label,
          path: pathStr.split(' > ')
            .slice(0, pathStr.length - 1)
        });
      } else {
        let target = kw.findBy('identifier', model.uuid);

        kw.removeObject(target);
      }
    },
    removeKeyword() {
      this.send('deleteKeyword', ...arguments);
    },
    changeFullPath(evt) {
      let kw = this.currentModel.get('keywords.keyword');
      let val = evt.target.checked;

      this.currentModel.set('keywords.fullPath', val);

      kw.forEach(function (curr) {
        if(val) {
          Ember.set(curr, 'keyword', curr.path.join(' > '));
        } else {
          let words = curr.keyword.split(' > ');
          Ember.set(curr, 'keyword', words[words.length - 1]);
        }
      });
    }
  }
});
