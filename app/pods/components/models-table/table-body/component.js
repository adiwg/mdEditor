import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Body from 'ember-models-table/components/models-table/table-body';

@classic
export default class TableBody extends Body {
  @action
  clickOnRowExpand(index, record) {
    if(this.themeInstance.selectRowOnExpandClick) {
      this.clickOnRow(index, record);
    }
  }
}
