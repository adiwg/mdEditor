import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class TableBodyComponent extends Component {
  tagName = '';

  @action
  clickOnRowExpand(index, record) {
    if (this.themeInstance && this.themeInstance.selectRowOnExpandClick) {
      this.clickOnRow(index, record);
    }
  }
}
