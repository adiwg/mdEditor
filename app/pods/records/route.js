import Ember from 'ember';

export default Ember.Route.extend({
  /*beforeModel() {
      this.transitionTo('records.list');
    },*/

  renderTemplate() {
    this.render('records.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('records', {
      into: 'application'
    });
  }
});
