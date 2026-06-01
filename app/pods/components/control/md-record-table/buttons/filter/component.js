import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { once } from '@ember/runloop';

@classic
export default class FilterComponent extends Component {
  @service flashMessages;

  get showButton() {
    return this.selectedItems?.length >= 1;
  }

  init() {
    super.init(...arguments);
    if (!this.deleteSelected) {
      this.deleteSelected = this._deleteSelected.bind(this);
    }
  }

  _deleteSelected(records) {
    records.forEach((rec) => {
      rec.destroyRecord().then((rec) => {
        rec.unloadRecord();
        once(() => {
          records.removeObject(rec);
          this.flashMessages.danger(
            `Deleted ${rec.constructor.modelName} "${rec.get('title')}".`
          );
        });
      });
    });
  }
}
