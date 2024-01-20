import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let rec = this.store.createRecord('record');
    rec.id = rec.recordId;

    this.replaceWith('record.new.id', rec.id);
  }
});
