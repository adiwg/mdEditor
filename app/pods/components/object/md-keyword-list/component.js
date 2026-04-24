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
  onAddKeyword(model) {
    if (typeof this.addKeyword === 'function') {
      this.addKeyword(model);
    }
  }

  @action
  onDeleteKeyword(model, object) {
    if (typeof this.deleteKeyword === 'function') {
      this.deleteKeyword(model, object);
    }
  }

  @action
  hideThesaurus() {
    const container = this.element?.closest('.md-keywords-container');
    if (container) {
      container.classList.toggle('hide-thesaurus');
    }
  }
}
