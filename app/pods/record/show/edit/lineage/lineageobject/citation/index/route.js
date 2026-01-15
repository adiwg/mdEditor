import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
    editIdentifier(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.citation.identifier',
          index)
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    }
    goBack(){
      this.transitionTo('record.show.edit.lineage.lineageobject');
    }
}