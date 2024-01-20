import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let rec = this.store.createRecord('contact');
    rec.id = rec.contactId;

		this.replaceWith('contact.new.id', rec.id);
	}
});
