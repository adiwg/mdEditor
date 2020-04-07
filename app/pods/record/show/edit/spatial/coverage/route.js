import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    this.set('coverageId', params.coverage_id)

    return this.setupModel();
  }
});
