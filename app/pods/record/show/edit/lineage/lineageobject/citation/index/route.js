import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route
} = Ember;

export default Route.extend(ScrollTo, {
  actions: {
    editIdentifier(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.citation.identifier',
          index)
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    },
    goBack(){
      this.transitionTo('record.show.edit.lineage.lineageobject');
    }
  }
});
