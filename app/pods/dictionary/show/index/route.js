import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Ember.Route.extend(ScrollTo, {
  actions: {
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
  }
});
