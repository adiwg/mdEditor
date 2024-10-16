import Route from '@ember/routing/route';

export default Route.extend({
  redirect(model) {
    this.replaceWith('record.show.edit.main', model);
  },
});
