import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CheckAllComponent extends Component {
  @action
  doToggleAllSelection() {
    if (this.args.toggleAllSelection) {
      this.args.toggleAllSelection();
    }
  }
}
