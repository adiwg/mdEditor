import Table from 'ember-models-table/components/models-table';
import Theme from './themes/bootstrap3';

export default Table.extend({
  init() {
    this.pageSizeValues = [10, 25, 50, 500];
    this.filteringIgnoreCase = true;

    this._super(...arguments);
  },
  themeInstance: Theme.create()
});
