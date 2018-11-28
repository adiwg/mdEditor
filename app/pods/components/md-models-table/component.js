import Table from 'ember-models-table/components/models-table';
import Theme from './themes/bootstrap3';
import { computed } from '@ember/object';

export default Table.extend({
  themeInstance: Theme.create(),
  filteringIgnoreCase: true,
  pageSizeValues: computed(function() {
    return [10, 25, 50, 500];
  }),
});
