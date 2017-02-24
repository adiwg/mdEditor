import Ember from 'ember';

export default Ember.Component.extend({
  keyword: Ember.inject.service(),

  thesaurusList: Ember.computed('keyword', function () {
    this.get('keyword').thesaurus
      .map((k) => {
        return {
          id: k.citation.identifier[0].identifier,
          label: k.label
        };
      });
  })
});
