import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { A, isArray } from '@ember/array';
import EmberObject, { get, set, action } from '@ember/object';
import { isEmpty } from '@ember/utils';

@classic
export default class ThesaurusRoute extends Route {
  @service
  keyword;

  model(params) {
    this.set('thesaurusId', params.thesaurus_id);

    return this.setupModel();
  }

  setupModel() {
    let thesaurusId = this.thesaurusId || this.controller.get('thesaurusId');
    let model = this.modelFor('record.show.edit.keywords');
    let thesaurus = model
      .get('json.metadata.resourceInfo.keyword')
      .get(thesaurusId);

    //make sure the thesaurus still exists
    if (isEmpty(thesaurus)) {
      this.flashMessages.warning('No thesaurus found! Re-directing to list...');
      this.replaceWith('record.show.edit.keywords');

      return;
    }

    if (!isArray(thesaurus.keyword)) {
      set(thesaurus, 'keyword', A());
    }

    return EmberObject.create({
      id: thesaurusId,
      keywords: thesaurus,
      model: model,
      path: `json.metadata.resourceInfo.keyword.${thesaurusId}`,
      thesaurus: this.keyword.findById(
        thesaurus.thesaurus.identifier[0].identifier
      ),
    });
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
      thesaurusId: this.thesaurusId,
    });
  }

  @action
  selectKeyword(node, path) {
    let model = this.currentRouteModel();
    let keywords = model.get('model').get(model.get('path'));
    let kw = keywords.keyword;
    let target = kw.findBy('identifier', node.uuid);

    if (node.isSelected && target === undefined) {
      let pathStr = '';

      if (isArray(path)) {
        pathStr = path.reduce(function (prev, item) {
          prev = prev ? `${prev} > ${item.label}` : item.label;

          return prev;
        }, '');
      }

      kw.pushObject({
        identifier: node.uuid,
        keyword: keywords.fullPath && pathStr ? pathStr : node.label,
        path: pathStr.split(' > ').slice(0, pathStr.length - 1),
      });
    } else {
      kw.removeObject(target);
    }
  }

  @action
  removeKeyword() {
    this.send('deleteKeyword', ...arguments);
  }

  @action
  changeFullPath(evt) {
    let model = this.currentRouteModel();
    let keywords = model.get('model').get(model.get('path'));
    let kw = get(keywords, 'keyword');
    let val = evt.target.checked;

    set(keywords, 'fullPath', val);

    kw.forEach(function (curr) {
      if (val) {
        set(curr, 'keyword', curr.path.join(' > '));
      } else {
        let words = curr.keyword.split(' > ');
        set(curr, 'keyword', words[words.length - 1]);
      }
    });
  }
}