import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  actions: {
    linkTo(){
      this.transitionTo(...arguments);
    },
    editDomain(id) {
      this.transitionTo('dictionary.show.edit.domain.edit', id);
    },
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
  }
});
