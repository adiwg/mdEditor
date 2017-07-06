import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route
} = Ember;

export default Route.extend(ScrollTo, {
  actions: {
    editIdentifier(index) {
      this.transitionTo('record.show.edit.metadata.alternate.identifier',
          index)
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    }
  }
});
