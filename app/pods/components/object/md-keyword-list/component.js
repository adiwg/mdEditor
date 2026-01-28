import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';

/**
 * @module mdeditor
 * @submodule components-object
 */

@classic
export default class MdKeywordListComponent extends Component {
  get readOnly() {
    return this.model?.thesaurus?.identifier?.[0]?.identifier !== 'custom';
  }

  @action
  addKeyword(model) {
    this.addKeyword(model);
  }

  @action
  deleteKeyword(model, object) {
    this.deleteKeyword(model, object);
  }

  @action
  hideThesaurus(el) {
    const container = el.closest('.md-keywords-container');
    if (container) {
      container.classList.toggle('hide-thesaurus');
    }
  }
}
