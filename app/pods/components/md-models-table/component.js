import classic from 'ember-classic-decorator';
import Table from 'ember-models-table/components/models-table';
import Theme from './themes/bootstrap3';

@classic
export default class MdModelsTableComponent extends Table {
  themeInstance = Theme.create();
}
