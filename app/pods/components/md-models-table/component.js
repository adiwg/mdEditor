import Table from 'ember-models-table/components/models-table';
import Theme from './themes/bootstrap3';
// import {
//   get
// } from '@ember/object';

export default Table.extend({
  themeInstance: Theme.create(),
  filteringIgnoreCase: true
});
