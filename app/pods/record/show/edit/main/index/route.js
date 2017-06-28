import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';
const {
  Route
} = Ember;

export default Route.extend(ScrollTo, {
  actions: {
    editCitation(scrollTo) {
      this.transitionTo('record.show.edit.main.citation').then(function () {
        this.setScrollTo(scrollTo);
      }.bind(this));
    }
  }
});
