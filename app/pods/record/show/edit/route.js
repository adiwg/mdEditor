import Ember from 'ember';

export default Ember.Route.extend({
  navLinks:[{
      name: 'Keywords',
      target: 'record.show.edit.keywords'

  },{
      name: 'Quality',
      target: 'record.show.edit.quality'

  }],
  beforeModel (transition) {
    if (transition.targetName === 'record.show.edit.index') {
      this.transitionTo('record.show.edit.main');
    }
  },
  renderTemplate (controller, model) {
    this.render('record.show.edit.nav', {
      into: 'record.show.nav'
    });
    this.render('record.show.edit.nav-secondary', {
      into: 'application',
      controller: 'application',
      outlet: 'nav-secondary',
      model: this.get('navLinks')
    });
    this.render('record.show.edit', {
      into: 'record',
      model: model
    });
  }
});
