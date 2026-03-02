import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class CheckAllComponent extends Component {
  // toggleAllSelection is passed in from parent
  toggleAllSelection = null;

  @action
  doToggleAllSelection() {
    if (this.toggleAllSelection) {
      this.toggleAllSelection();
    }
  }
}
