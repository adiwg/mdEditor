import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  actions: {
    editIdentifier(index) {
      this.transitionTo('dictionary.show.edit.entity.edit.citation.identifier', index)
        .then(function () {
          this.setScrollTo('entity-identifier');
        }.bind(this));
    }
  },
  backToEntity() {
    this.transitionTo('dictionary.show.edit.entity.edit',
      this.get('entityId'));
  }
});
