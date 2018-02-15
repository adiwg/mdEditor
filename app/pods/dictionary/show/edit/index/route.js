import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';
const {
  Route,
  get,
  getWithDefault,
  set
} = Ember;

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'citation', getWithDefault(model, 'citation', {}));
    set(model, 'responsibleParty', getWithDefault(model, 'responsibleParty', {}));
    set(model, 'subject', getWithDefault(model, 'subject', []));
    set(model, 'recommendedUse', getWithDefault(model, 'recommendedUse', []));
    set(model, 'locale', getWithDefault(model, 'locale', []));
    set(model, 'domain', getWithDefault(model, 'domain', []));
    set(model, 'entity', getWithDefault(model, 'entity', []));
  },
  actions: {
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
  }
});
