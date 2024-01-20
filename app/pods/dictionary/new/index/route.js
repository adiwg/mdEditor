import Route from '@ember/routing/route';

export default Route.extend({
  redirect: function() {
    let rec = this.store.createRecord('dictionary');
    rec.id = rec.dictionaryId;

    this.replaceWith('dictionary.new.id', rec.id);
  }
});
