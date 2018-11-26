import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { copy } from '@ember/object/internals';

export default Route.extend({
  breadCrumb: {},
  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  },
  model(params) {
    return this.store.peekRecord('record', params.record_id);
  },
  renderTemplate() {
    this.render('record.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('record.show', {
      into: 'record'
    });
  },
  actions: {
    destroyRecord: function () {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Deleted Record: ${model.get('title')}`);
          this.replaceWith('records');
        });
    },
    copyRecord: function () {

      get(this, 'flashMessages')
        .success(
          `Copied Record: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('record.new.id', copy(this.currentRouteModel()));
    }
  }
});
