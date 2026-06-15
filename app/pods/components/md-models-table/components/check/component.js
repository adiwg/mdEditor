import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tryInvoke } from '@ember/utils';

export default class CheckComponent extends Component {
  @action
  doClickOnRow(event) {
    if (this.args.clickOnRow) {
      this.args.clickOnRow(this.args.index, this.args.record);
    }

    tryInvoke(event, 'stopPropagation');
    return false;
  }
}
