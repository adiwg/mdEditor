import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class FundingRoute extends Route {
  @action
  deleteAllocation(){}

  @action
  editAllocation(){}
}