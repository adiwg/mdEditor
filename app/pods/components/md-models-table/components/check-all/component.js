import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class CheckAllComponent extends Component {
  actions = {
    toggleAllSelection() {
      this.toggleAllSelection();
    }
  }
}
