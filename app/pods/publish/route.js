import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class PublishRoute extends Route {
  @service('publish')
  publish;

  model() {
    return this.publish.catalogs;
  }
}