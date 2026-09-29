import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';

@classic
export default class SubbarImportcsvComponent extends Component {
  @action
  doImport() {
    if (this.actionContext) {
      this.actionContext.send('doImport');
    }
  }

  @action
  cancelImport() {
    if (this.actionContext) {
      this.actionContext.send('cancelImport');
    }
  }
}
