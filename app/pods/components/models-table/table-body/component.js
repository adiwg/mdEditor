import Body from 'ember-models-table/components/models-table/table-body';

export default Body.extend({
  actions: {
    clickOnRowExpand(index, record) {
      if(this.themeInstance.selectRowOnExpandClick) {
        this.clickOnRow(index, record);
      }
    }
  }
});
