import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      id: params.record_id
    };
  },
  renderTemplate() {
    this.render('record.show.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('record.show', {
      into: 'record'
    });
  }
});
