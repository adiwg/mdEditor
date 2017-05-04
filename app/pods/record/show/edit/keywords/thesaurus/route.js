import Ember from 'ember';

const {
  isArray,
  A,
  set,
  get
} = Ember;

export default Ember.Route.extend({
  keyword: Ember.inject.service(),
  model(params) {
    let model = this.modelFor('record.show.edit.keywords');
    let kw = model.get('json.metadata.resourceInfo.keyword')
      .get(params.thesaurus_id);
    //let keywords = kw.keyword;
    if(!isArray(kw.keyword)) {
      set(kw, 'keyword', A());
    }

    return Ember.Object.create({
      id: params.thesaurus_id,
      keywords: kw,
      model: model,
      path: `json.metadata.resourceInfo.keyword.${params.thesaurus_id}`,
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
    selectKeyword(node, path) {
      let model = this.currentRouteModel();
      let keywords = model.get('model')
        .get(model.get('path'));
      let kw = keywords.keyword;
      let target = kw.findBy('identifier', node.uuid);

      if(node.isSelected && target === undefined) {
        let pathStr = '';

        if(Ember.isArray(path)) {
          pathStr = path.reduce(function (prev, item) {
            prev = prev ? `${prev} > ${item.label}` : item.label;

            return prev;
          }, '');
        }

        kw.pushObject({
          identifier: node.uuid,
          keyword: keywords.fullPath && pathStr ?
            pathStr : node.label,
          path: pathStr.split(' > ')
            .slice(0, pathStr.length - 1)
        });
      } else {
        kw.removeObject(target);
      }
    },
    removeKeyword() {
      this.send('deleteKeyword', ...arguments);
    },
    changeFullPath(evt) {
      let model = this.currentRouteModel();
      let keywords = model.get('model')
        .get(model.get('path'));
      let kw = get(keywords,'keyword');
      let val = evt.target.checked;

      set(keywords, 'fullPath', val);

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
