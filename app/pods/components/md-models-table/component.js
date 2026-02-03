import classic from 'ember-classic-decorator';
import Table from 'ember-models-table/components/models-table';
import { getOwner, setOwner } from '@ember/application';
import Theme from './themes/bootstrap3';

@classic
export default class MdModelsTableComponent extends Table {
  init() {
    const theme = Theme.create();
    setOwner(theme, getOwner(this));
    this.themeInstance = theme;
    super.init(...arguments);
  }
}
