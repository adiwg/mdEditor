import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  actions: {
    editIdentifier(index) {
      this.transitionTo(
        'record.show.edit.metadata.alternate.identifier',
        index
      ).then(
        function () {
          this.setScrollTo('identifier');
        }.bind(this)
      );
    },
  },
});
