import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  actions: {
    editIdentifier(index) {
      this.transitionTo(
        'record.show.edit.lineage.lineageobject.citation.identifier',
        index
      ).then(
        function () {
          this.setScrollTo('identifier');
        }.bind(this)
      );
    },
    goBack() {
      this.transitionTo('record.show.edit.lineage.lineageobject');
    },
  },
});
