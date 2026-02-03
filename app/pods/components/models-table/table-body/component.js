import Body from 'ember-models-table/components/models-table/table-body';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';

@classic
export default class TableBodyComponent extends Body {
  layoutName = 'components/models-table/table-body';

  @action
  clickOnRowExpand(index, record) {
    if(this.themeInstance.selectRowOnExpandClick) {
      this.clickOnRow(index, record);
    }
  }
}
