import Controller from '@ember/controller';
import { action, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { copy } from 'ember-copy';

export default class KeywordsIndexController extends Controller {
  @service router;

  @action
  addThesaurus() {
    let the = this.model.get('json.metadata.resourceInfo.keyword');

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

    the.pushObject({
      keyword: [],
      keywordType: 'theme',
      thesaurus: {
        identifier: [{ identifier: null }],
      },
      fullPath: true,
    });

    this.set('refresh', the.get('length'));
    this.set('scrollTo', 'thesaurus-' + (the.get('length') - 1));
  }

  @action
  deleteThesaurus(id) {
    let the = this.model.get('json.metadata.resourceInfo.keyword');

    the.removeAt(id);
    this.set('refresh', the.get('length'));
  }

  @action
  editThesaurus(id) {
    this.router.transitionTo('record.show.edit.keywords.thesaurus', id);
  }

  @action
  selectThesaurus(selected, thesaurus) {
    if (selected) {
      set(thesaurus, 'thesaurus', copy(selected.citation, true));
      if (selected.keywordType) {
        set(thesaurus, 'keywordType', selected.keywordType);
      }
    } else {
      set(thesaurus, 'thesaurus.identifier.0.identifier', 'custom');
    }
  }

  @action
  addKeyword(model, obj) {
    let k = obj ? obj : {};

    model.pushObject(k);
  }

  @action
  deleteKeyword(model, obj) {
    if (typeof obj === 'number') {
      model.removeAt(obj);
    } else {
      model.removeObject(obj);
    }
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
