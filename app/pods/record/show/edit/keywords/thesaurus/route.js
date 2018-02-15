import Ember from 'ember';

const {
  isArray,
  A,
  set,
  get,
  isEmpty
} = Ember;

export default Ember.Route.extend({
  keyword: Ember.inject.service(),
  model(params) {
    this.set('thesaurusId', params.thesaurus_id);

    return this.setupModel();
  },

  setupModel() {
    let thesaurusId = get(this, 'thesaurusId') || this.controller.get('thesaurusId');
    let model = this.modelFor('record.show.edit.keywords');
    let thesaurus = model.get('json.metadata.resourceInfo.keyword')
      .get(thesaurusId);

    //make sure the thesaurus still exists
    if(isEmpty(thesaurus)) {
      Ember.get(this, 'flashMessages')
        .warning('No thesaurus found! Re-directing to list...');
      this.replaceWith('record.show.edit.keywords');

      return;
    }

    if(!isArray(thesaurus.keyword)) {
      set(thesaurus, 'keyword', A());
    }

    return Ember.Object.create({
      id: thesaurusId,
      keywords: thesaurus,
      model: model,
      path: `json.metadata.resourceInfo.keyword.${thesaurusId}`,
      thesaurus: this.get('keyword')
        .findById(thesaurus.thesaurus.identifier[0].identifier)
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
      .setProperties({
        subbar: this.get('subbar'),
        onCancel: this.setupModel,
        cancelScope: this,
        thesaurusId: this.get('thesaurusId')
      });
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
      let kw = get(keywords, 'keyword');
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
