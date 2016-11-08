import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {},
  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  },
  model(params) {
    return this.store.findRecord('record', params.record_id);
  },
  renderTemplate() {
    this.render('records.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('record.show', {
      into: 'record'
    });
  }
});
