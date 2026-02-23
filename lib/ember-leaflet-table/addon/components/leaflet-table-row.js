import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class LeafletTableRowComponent extends Component {
  tagName = 'tr';

  mouseEnter() {
    let row = this.record;

    if (row && !row.state) {
      row.set ? row.set('state', 'hover') : (row.state = 'hover');
    }
  }

  mouseLeave() {
    let row = this.record;

    if (row && row.state === 'hover') {
      row.set ? row.set('state', '') : (row.state = '');
    }
  }

  doubleClick() {
    if (this.showForm) {
      this.showForm(this.record);
    }
  }

  @action
  handleClick() {
    if (this.clickOnRow) {
      this.clickOnRow(this.index, this.record);
    }
  }
}
