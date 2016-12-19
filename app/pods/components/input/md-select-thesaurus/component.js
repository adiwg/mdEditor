import Ember from 'ember';

export default Ember.Component.extend({
  keyword: Ember.inject.service(),

  thesaurusList: Ember.computed('keyword.thesaurus.[]', function () {
    let list = this.get('keyword')
      .thesaurus
      .map((k) => {
        return Ember.Object.create({
          id: k.citation.identifier[0].identifier,
          label: k.label || k.citation.title || 'Keywords'
        });
      });

    list.unshift(Ember.Object.create({
      id: 'custom',
      label: 'Custom Entry'
    }));
    return list;
  }),
  actions: {
    update(id, thesaurus) {
      let selected = this.get('keyword').findById(id);

      this.get('selectThesaurus')(selected, thesaurus);
    }
  }
});
