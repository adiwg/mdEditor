import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('record.show.edit.nav', {
      into: 'record.show.nav'
    });
    this.render('record.show.edit.nav-secondary', {
      into: 'application',
      outlet: 'nav-secondary'
    });
    this.render('record.show.edit', {
      into: 'record'
    });
  }
});
