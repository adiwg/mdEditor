import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class LineageObjectIndexController extends Controller {
  @service router;
  @action
  editCitation(index) {
    this.router
      .transitionTo('record.show.edit.lineage.lineageobject.citation', index)
      .then(() => {
        this.setScrollTo('citation');
      });
  }

  @action
  editSource(index) {
    this.router
      .transitionTo('record.show.edit.lineage.lineageobject.source', index)
      .then(() => {
        this.setScrollTo('source');
      });
  }

  @action
  editProcessStep(index) {
    this.router
      .transitionTo('record.show.edit.lineage.lineageobject.step', index)
      .then(() => {
        this.setScrollTo('process-step');
      });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
