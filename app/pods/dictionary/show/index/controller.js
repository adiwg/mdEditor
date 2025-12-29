import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service flashMessages;
  
  queryParams = ['scrollTo'];
  scrollTo = '';

  @action
  linkTo() {
    this.transitionToRoute(...arguments);
  }

  @action
  editDomain(id) {
    this.transitionToRoute('dictionary.show.edit.domain.edit', id);
  }

  @action
  editCitation(scrollTo) {
    this.transitionToRoute('dictionary.show.edit.citation')
      .then(() => {
        this.setScrollTo(scrollTo);
      });
  }

  @action
  destroyDictionary() {
    let model = this.model;
    model.destroyRecord().then(() => {
      this.flashMessages.success(`Deleted Dictionary: ${model.get('title')}`);
      this.transitionToRoute('dictionaries');
    });
  }

  @action
  copyDictionary() {
    this.flashMessages.success(
      `Copied Dictionary: ${this.model.get('title')}`
    );
    // Import the copy utility
    import('mdeditor/utils/copy').then(({ copy }) => {
      this.transitionToRoute('dictionary.new.id', copy(this.model));
    });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
