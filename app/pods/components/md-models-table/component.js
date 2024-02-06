import Table from 'ember-models-table/components/models-table';
import Theme from './themes/bootstrap3';


export default class MdModelsTableComponent extends Table {
  themeInstance = Theme.create();
}
