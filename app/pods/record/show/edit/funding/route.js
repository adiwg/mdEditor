import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class FundingRoute extends Route {
  @action
  deleteAllocation() {}

  @action
  editAllocation() {}
}
